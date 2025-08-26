from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials
from bson import ObjectId

from models import UserCreate, UserLogin, Token, UserResponse, User
from utils.auth import (
    authenticate_user, create_access_token, get_password_hash,
    get_user_by_email, get_user_by_username, security, get_current_user
)
from database import get_users_collection

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/register", response_model=dict)
async def register_user(user_data: UserCreate):
    """Register a new user"""
    users_collection = get_users_collection()
    
    # Check if user already exists
    existing_user = await get_user_by_email(user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    existing_username = await get_user_by_username(user_data.username)
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # Create new user
    user = User(
        username=user_data.username,
        email=user_data.email,
        password_hash=get_password_hash(user_data.password),
        display_name=user_data.display_name
    )
    
    # Insert into database
    result = await users_collection.insert_one(user.dict(by_alias=True))
    
    # Create access token
    access_token = create_access_token(data={"sub": str(result.inserted_id)})
    
    # Get user data for response
    created_user = await users_collection.find_one({"_id": result.inserted_id})
    user_response = UserResponse(
        id=str(created_user["_id"]),
        username=created_user["username"],
        email=created_user["email"],
        display_name=created_user["display_name"],
        avatar_url=created_user.get("avatar_url"),
        verified=created_user["verified"],
        followers=created_user["followers"],
        following=created_user["following"],
        bio=created_user.get("bio"),
        created_at=created_user["created_at"]
    )
    
    return {
        "message": "User registered successfully",
        "user": user_response,
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post("/login", response_model=dict)
async def login_user(user_data: UserLogin):
    """Authenticate user and return token"""
    user = await authenticate_user(user_data.email, user_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": str(user.id)})
    
    user_response = UserResponse(
        id=str(user.id),
        username=user.username,
        email=user.email,
        display_name=user.display_name,
        avatar_url=user.avatar_url,
        verified=user.verified,
        followers=user.followers,
        following=user.following,
        bio=user.bio,
        created_at=user.created_at
    )
    
    return {
        "message": "Login successful",
        "user": user_response,
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """Get current user profile"""
    return UserResponse(
        id=str(current_user.id),
        username=current_user.username,
        email=current_user.email,
        display_name=current_user.display_name,
        avatar_url=current_user.avatar_url,
        verified=current_user.verified,
        followers=current_user.followers,
        following=current_user.following,
        bio=current_user.bio,
        created_at=current_user.created_at
    )

@router.post("/refresh", response_model=Token)
async def refresh_token(current_user: User = Depends(get_current_user)):
    """Refresh access token"""
    access_token = create_access_token(data={"sub": str(current_user.id)})
    return Token(access_token=access_token, token_type="bearer")