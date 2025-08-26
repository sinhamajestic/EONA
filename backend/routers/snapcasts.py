from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from bson import ObjectId
from datetime import datetime

from models import (
    SnapCast, SnapCastCreate, SnapCastUpdate, SnapCastResponse, 
    User, UserResponse, FeedQuery, VoiceGenerationRequest,
    VoiceGenerationResponse, CommentCreate, CommentResponse
)
from utils.auth import get_current_user, get_current_user_optional
from database import (
    get_snapcasts_collection, get_users_collection, 
    get_likes_collection, get_comments_collection
)
from services.murf_service import murf_service
from services.ai_service import ai_service

router = APIRouter(prefix="/api/snapcasts", tags=["SnapCasts"])

@router.post("/", response_model=dict)
async def create_snapcast(
    snapcast_data: SnapCastCreate,
    current_user: User = Depends(get_current_user)
):
    """Create a new SnapCast"""
    snapcasts_collection = get_snapcasts_collection()
    
    # Generate audio using Murf API
    audio_url, duration, waveform = await murf_service.generate_audio(
        text=snapcast_data.content,
        voice_type=snapcast_data.voice_type.value,
        format="mp3"
    )
    
    # Create SnapCast object
    snapcast = SnapCast(
        title=snapcast_data.title,
        content=snapcast_data.content,
        user_id=current_user.id,
        voice_type=snapcast_data.voice_type,
        category=snapcast_data.category,
        tags=snapcast_data.tags,
        audio_url=audio_url,
        duration=duration,
        waveform=waveform or [],
        is_public=snapcast_data.is_public,
        allow_comments=snapcast_data.allow_comments,
        allow_remixes=snapcast_data.allow_remixes
    )
    
    # Insert into database
    result = await snapcasts_collection.insert_one(snapcast.dict(by_alias=True))
    
    # Get created snapcast with user data
    created_snapcast = await get_snapcast_with_user(str(result.inserted_id))
    
    return {
        "message": "SnapCast created successfully",
        "snapcast": created_snapcast
    }

@router.get("/", response_model=dict)
async def get_snapcasts(
    category: Optional[str] = None,
    search: Optional[str] = None,
    tags: Optional[str] = Query(None, description="Comma-separated tags"),
    sort_by: str = Query("trending", regex="^(trending|recent|popular)$"),
    limit: int = Query(20, le=100),
    skip: int = Query(0, ge=0),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Get SnapCasts feed with filtering and pagination"""
    snapcasts_collection = get_snapcasts_collection()
    
    # Build query
    query = {"is_public": True}
    
    if category:
        query["category"] = category
    
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"content": {"$regex": search, "$options": "i"}},
            {"tags": {"$regex": search, "$options": "i"}}
        ]
    
    if tags:
        tag_list = [tag.strip() for tag in tags.split(",")]
        query["tags"] = {"$in": tag_list}
    
    # Build sort
    sort_options = {
        "trending": [("likes", -1), ("created_at", -1)],
        "recent": [("created_at", -1)],
        "popular": [("likes", -1)]
    }
    sort = sort_options.get(sort_by, sort_options["trending"])
    
    # Get snapcasts
    cursor = snapcasts_collection.find(query).sort(sort).skip(skip).limit(limit)
    snapcasts = []
    
    async for snapcast_doc in cursor:
        snapcast_response = await build_snapcast_response(snapcast_doc, current_user)
        snapcasts.append(snapcast_response)
    
    # Get total count for pagination
    total = await snapcasts_collection.count_documents(query)
    
    return {
        "snapcasts": snapcasts,
        "total": total,
        "limit": limit,
        "skip": skip,
        "has_more": skip + limit < total
    }

@router.get("/{snapcast_id}", response_model=SnapCastResponse)
async def get_snapcast(
    snapcast_id: str,
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Get specific SnapCast by ID"""
    if not ObjectId.is_valid(snapcast_id):
        raise HTTPException(status_code=400, detail="Invalid SnapCast ID")
    
    snapcast = await get_snapcast_with_user(snapcast_id)
    if not snapcast:
        raise HTTPException(status_code=404, detail="SnapCast not found")
    
    return snapcast

@router.put("/{snapcast_id}", response_model=dict)
async def update_snapcast(
    snapcast_id: str,
    snapcast_data: SnapCastUpdate,
    current_user: User = Depends(get_current_user)
):
    """Update SnapCast (owner only)"""
    if not ObjectId.is_valid(snapcast_id):
        raise HTTPException(status_code=400, detail="Invalid SnapCast ID")
    
    snapcasts_collection = get_snapcasts_collection()
    
    # Check if snapcast exists and user owns it
    snapcast = await snapcasts_collection.find_one({
        "_id": ObjectId(snapcast_id),
        "user_id": current_user.id
    })
    
    if not snapcast:
        raise HTTPException(status_code=404, detail="SnapCast not found or not owned by user")
    
    # Build update data
    update_data = {}
    if snapcast_data.title is not None:
        update_data["title"] = snapcast_data.title
    if snapcast_data.content is not None:
        update_data["content"] = snapcast_data.content
    if snapcast_data.category is not None:
        update_data["category"] = snapcast_data.category.value
    if snapcast_data.tags is not None:
        update_data["tags"] = snapcast_data.tags
    if snapcast_data.is_public is not None:
        update_data["is_public"] = snapcast_data.is_public
    if snapcast_data.allow_comments is not None:
        update_data["allow_comments"] = snapcast_data.allow_comments
    if snapcast_data.allow_remixes is not None:
        update_data["allow_remixes"] = snapcast_data.allow_remixes
    
    update_data["updated_at"] = datetime.utcnow()
    
    # Update in database
    await snapcasts_collection.update_one(
        {"_id": ObjectId(snapcast_id)},
        {"$set": update_data}
    )
    
    # Get updated snapcast
    updated_snapcast = await get_snapcast_with_user(snapcast_id)
    
    return {
        "message": "SnapCast updated successfully",
        "snapcast": updated_snapcast
    }

@router.delete("/{snapcast_id}")
async def delete_snapcast(
    snapcast_id: str,
    current_user: User = Depends(get_current_user)
):
    """Delete SnapCast (owner only)"""
    if not ObjectId.is_valid(snapcast_id):
        raise HTTPException(status_code=400, detail="Invalid SnapCast ID")
    
    snapcasts_collection = get_snapcasts_collection()
    
    # Check if snapcast exists and user owns it
    result = await snapcasts_collection.delete_one({
        "_id": ObjectId(snapcast_id),
        "user_id": current_user.id
    })
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="SnapCast not found or not owned by user")
    
    return {"message": "SnapCast deleted successfully"}

@router.post("/{snapcast_id}/like")
async def toggle_like(
    snapcast_id: str,
    current_user: User = Depends(get_current_user)
):
    """Like or unlike a SnapCast"""
    if not ObjectId.is_valid(snapcast_id):
        raise HTTPException(status_code=400, detail="Invalid SnapCast ID")
    
    snapcasts_collection = get_snapcasts_collection()
    likes_collection = get_likes_collection()
    
    # Check if snapcast exists
    snapcast = await snapcasts_collection.find_one({"_id": ObjectId(snapcast_id)})
    if not snapcast:
        raise HTTPException(status_code=404, detail="SnapCast not found")
    
    # Check if user already liked this snapcast
    existing_like = await likes_collection.find_one({
        "user_id": current_user.id,
        "snapcast_id": ObjectId(snapcast_id)
    })
    
    if existing_like:
        # Unlike
        await likes_collection.delete_one({"_id": existing_like["_id"]})
        new_likes_count = max(0, snapcast["likes"] - 1)
        action = "unliked"
    else:
        # Like
        like_doc = {
            "user_id": current_user.id,
            "snapcast_id": ObjectId(snapcast_id),
            "created_at": datetime.utcnow()
        }
        await likes_collection.insert_one(like_doc)
        new_likes_count = snapcast["likes"] + 1
        action = "liked"
    
    # Update likes count
    await snapcasts_collection.update_one(
        {"_id": ObjectId(snapcast_id)},
        {"$set": {"likes": new_likes_count}}
    )
    
    return {
        "message": f"SnapCast {action} successfully",
        "likes": new_likes_count,
        "liked": action == "liked"
    }

@router.post("/generate-voice", response_model=VoiceGenerationResponse)
async def generate_voice_preview(
    request: VoiceGenerationRequest,
    current_user: User = Depends(get_current_user)
):
    """Generate voice preview without creating SnapCast"""
    audio_url, duration, waveform = await murf_service.generate_audio(
        text=request.text,
        voice_type=request.voice_type.value,
        format=request.format
    )
    
    return VoiceGenerationResponse(
        success=True,
        audio_url=audio_url,
        duration=duration,
        waveform=waveform,
        message="Voice generated successfully"
    )

@router.post("/enhance-content")
async def enhance_content(
    text: str,
    current_user: User = Depends(get_current_user)
):
    """Use AI to enhance content with suggestions"""
    enhancement = await ai_service.enhance_content(text)
    return enhancement

@router.get("/voices/available")
async def get_available_voices():
    """Get list of available voice types"""
    return {"voices": murf_service.get_available_voices()}

# Helper functions
async def get_snapcast_with_user(snapcast_id: str) -> Optional[SnapCastResponse]:
    """Get SnapCast with user information"""
    snapcasts_collection = get_snapcasts_collection()
    users_collection = get_users_collection()
    
    # Get snapcast
    snapcast = await snapcasts_collection.find_one({"_id": ObjectId(snapcast_id)})
    if not snapcast:
        return None
    
    # Get user
    user = await users_collection.find_one({"_id": snapcast["user_id"]})
    if not user:
        return None
    
    return await build_snapcast_response(snapcast, None)

async def build_snapcast_response(snapcast_doc: dict, current_user: Optional[User] = None) -> SnapCastResponse:
    """Build SnapCast response with user data"""
    users_collection = get_users_collection()
    
    # Get user data
    user_doc = await users_collection.find_one({"_id": snapcast_doc["user_id"]})
    user_response = UserResponse(
        id=str(user_doc["_id"]),
        username=user_doc["username"],
        email=user_doc["email"],
        display_name=user_doc["display_name"],
        avatar_url=user_doc.get("avatar_url"),
        verified=user_doc["verified"],
        followers=user_doc["followers"],
        following=user_doc["following"],
        bio=user_doc.get("bio"),
        created_at=user_doc["created_at"]
    )
    
    return SnapCastResponse(
        id=str(snapcast_doc["_id"]),
        title=snapcast_doc["title"],
        content=snapcast_doc["content"],
        user=user_response,
        voice_type=snapcast_doc["voice_type"],
        category=snapcast_doc["category"],
        tags=snapcast_doc["tags"],
        audio_url=snapcast_doc.get("audio_url"),
        duration=snapcast_doc.get("duration"),
        waveform=snapcast_doc.get("waveform", []),
        likes=snapcast_doc["likes"],
        remixes=snapcast_doc["remixes"],
        shares=snapcast_doc["shares"],
        comments=snapcast_doc["comments"],
        is_public=snapcast_doc["is_public"],
        allow_comments=snapcast_doc["allow_comments"],
        allow_remixes=snapcast_doc["allow_remixes"],
        created_at=snapcast_doc["created_at"],
        updated_at=snapcast_doc["updated_at"]
    )