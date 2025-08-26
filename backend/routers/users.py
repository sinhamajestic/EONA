from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from bson import ObjectId
from datetime import datetime

from models import User, UserResponse, UserUpdate, SnapCastResponse
from utils.auth import get_current_user, get_current_user_optional
from database import get_users_collection, get_snapcasts_collection, get_follows_collection
from routers.snapcasts import build_snapcast_response

router = APIRouter(prefix="/api/users", tags=["Users"])

@router.get("/{user_id}", response_model=UserResponse)
async def get_user_profile(
    user_id: str,
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Get user profile by ID"""
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid user ID")
    
    users_collection = get_users_collection()
    user_doc = await users_collection.find_one({"_id": ObjectId(user_id)})
    
    if not user_doc:
        raise HTTPException(status_code=404, detail="User not found")
    
    return UserResponse(
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

@router.put("/me", response_model=dict)
async def update_profile(
    user_data: UserUpdate,
    current_user: User = Depends(get_current_user)
):
    """Update current user profile"""
    users_collection = get_users_collection()
    
    # Build update data
    update_data = {}
    if user_data.display_name is not None:
        update_data["display_name"] = user_data.display_name
    if user_data.bio is not None:
        update_data["bio"] = user_data.bio
    if user_data.avatar_url is not None:
        update_data["avatar_url"] = user_data.avatar_url
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")
    
    update_data["updated_at"] = datetime.utcnow()
    
    # Update in database
    await users_collection.update_one(
        {"_id": current_user.id},
        {"$set": update_data}
    )
    
    # Get updated user
    updated_user = await users_collection.find_one({"_id": current_user.id})
    user_response = UserResponse(
        id=str(updated_user["_id"]),
        username=updated_user["username"],
        email=updated_user["email"],
        display_name=updated_user["display_name"],
        avatar_url=updated_user.get("avatar_url"),
        verified=updated_user["verified"],
        followers=updated_user["followers"],
        following=updated_user["following"],
        bio=updated_user.get("bio"),
        created_at=updated_user["created_at"]
    )
    
    return {
        "message": "Profile updated successfully",
        "user": user_response
    }

@router.get("/{user_id}/snapcasts", response_model=dict)
async def get_user_snapcasts(
    user_id: str,
    limit: int = Query(20, le=100),
    skip: int = Query(0, ge=0),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Get user's SnapCasts"""
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid user ID")
    
    snapcasts_collection = get_snapcasts_collection()
    
    # Build query - show public posts or user's own posts
    query = {"user_id": ObjectId(user_id)}
    if not current_user or str(current_user.id) != user_id:
        query["is_public"] = True
    
    # Get snapcasts
    cursor = snapcasts_collection.find(query).sort([("created_at", -1)]).skip(skip).limit(limit)
    snapcasts = []
    
    async for snapcast_doc in cursor:
        snapcast_response = await build_snapcast_response(snapcast_doc, current_user)
        snapcasts.append(snapcast_response)
    
    # Get total count
    total = await snapcasts_collection.count_documents(query)
    
    return {
        "snapcasts": snapcasts,
        "total": total,
        "limit": limit,
        "skip": skip,
        "has_more": skip + limit < total
    }

@router.post("/{user_id}/follow")
async def toggle_follow(
    user_id: str,
    current_user: User = Depends(get_current_user)
):
    """Follow or unfollow a user"""
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid user ID")
    
    if str(current_user.id) == user_id:
        raise HTTPException(status_code=400, detail="Cannot follow yourself")
    
    users_collection = get_users_collection()
    follows_collection = get_follows_collection()
    
    # Check if target user exists
    target_user = await users_collection.find_one({"_id": ObjectId(user_id)})
    if not target_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Check if already following
    existing_follow = await follows_collection.find_one({
        "follower_id": current_user.id,
        "following_id": ObjectId(user_id)
    })
    
    if existing_follow:
        # Unfollow
        await follows_collection.delete_one({"_id": existing_follow["_id"]})
        
        # Update counters
        await users_collection.update_one(
            {"_id": current_user.id},
            {"$inc": {"following": -1}}
        )
        await users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$inc": {"followers": -1}}
        )
        
        action = "unfollowed"
        following = False
    else:
        # Follow
        follow_doc = {
            "follower_id": current_user.id,
            "following_id": ObjectId(user_id),
            "created_at": datetime.utcnow()
        }
        await follows_collection.insert_one(follow_doc)
        
        # Update counters
        await users_collection.update_one(
            {"_id": current_user.id},
            {"$inc": {"following": 1}}
        )
        await users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$inc": {"followers": 1}}
        )
        
        action = "followed"
        following = True
    
    return {
        "message": f"User {action} successfully",
        "following": following
    }

@router.get("/me/following", response_model=dict)
async def get_following(
    current_user: User = Depends(get_current_user),
    limit: int = Query(20, le=100),
    skip: int = Query(0, ge=0)
):
    """Get users that current user is following"""
    users_collection = get_users_collection()
    follows_collection = get_follows_collection()
    
    # Get following relationships
    cursor = follows_collection.find({"follower_id": current_user.id}).skip(skip).limit(limit)
    following_ids = []
    
    async for follow in cursor:
        following_ids.append(follow["following_id"])
    
    # Get user data
    users = []
    if following_ids:
        cursor = users_collection.find({"_id": {"$in": following_ids}})
        async for user_doc in cursor:
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
            users.append(user_response)
    
    total = await follows_collection.count_documents({"follower_id": current_user.id})
    
    return {
        "users": users,
        "total": total,
        "limit": limit,
        "skip": skip,
        "has_more": skip + limit < total
    }

@router.get("/me/followers", response_model=dict)
async def get_followers(
    current_user: User = Depends(get_current_user),
    limit: int = Query(20, le=100),
    skip: int = Query(0, ge=0)
):
    """Get users that follow current user"""
    users_collection = get_users_collection()
    follows_collection = get_follows_collection()
    
    # Get follower relationships
    cursor = follows_collection.find({"following_id": current_user.id}).skip(skip).limit(limit)
    follower_ids = []
    
    async for follow in cursor:
        follower_ids.append(follow["follower_id"])
    
    # Get user data
    users = []
    if follower_ids:
        cursor = users_collection.find({"_id": {"$in": follower_ids}})
        async for user_doc in cursor:
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
            users.append(user_response)
    
    total = await follows_collection.count_documents({"following_id": current_user.id})
    
    return {
        "users": users,
        "total": total,
        "limit": limit,
        "skip": skip,
        "has_more": skip + limit < total
    }