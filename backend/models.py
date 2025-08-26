from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, EmailStr
from bson import ObjectId
from enum import Enum

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class VoiceType(str, Enum):
    MURF_EXCITED = "Murf Excited"
    MURF_PROFESSIONAL = "Murf Professional"
    MURF_FRIENDLY = "Murf Friendly"
    MURF_CALM = "Murf Calm"
    MURF_PLAYFUL = "Murf Playful"
    MURF_DRAMATIC = "Murf Dramatic"

class Category(str, Enum):
    MOTIVATION = "Motivation"
    NEWS = "News"
    LIFESTYLE = "Lifestyle"
    WELLNESS = "Wellness"
    COMEDY = "Comedy"
    EDUCATION = "Education"
    TECH = "Tech"
    CREATIVE = "Creative"

# User Models
class User(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    username: str = Field(..., min_length=3, max_length=20)
    email: EmailStr
    password_hash: str
    display_name: str = Field(..., min_length=1, max_length=50)
    avatar_url: Optional[str] = None
    verified: bool = False
    followers: int = 0
    following: int = 0
    bio: Optional[str] = Field(None, max_length=500)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    email: EmailStr
    password: str = Field(..., min_length=6)
    display_name: str = Field(..., min_length=1, max_length=50)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    display_name: str
    avatar_url: Optional[str]
    verified: bool
    followers: int
    following: int
    bio: Optional[str]
    created_at: datetime

class UserUpdate(BaseModel):
    display_name: Optional[str] = Field(None, min_length=1, max_length=50)
    bio: Optional[str] = Field(None, max_length=500)
    avatar_url: Optional[str] = None

# SnapCast Models
class SnapCast(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str = Field(..., min_length=1, max_length=200)
    content: str = Field(..., min_length=1, max_length=2000)
    user_id: PyObjectId
    voice_type: VoiceType
    category: Category
    tags: List[str] = Field(default_factory=list, max_items=10)
    audio_url: Optional[str] = None
    duration: Optional[int] = None  # in seconds
    waveform: List[int] = Field(default_factory=list)
    likes: int = 0
    remixes: int = 0
    shares: int = 0
    comments: int = 0
    is_public: bool = True
    allow_comments: bool = True
    allow_remixes: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class SnapCastCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    content: str = Field(..., min_length=1, max_length=2000)
    voice_type: VoiceType
    category: Category
    tags: List[str] = Field(default_factory=list, max_items=10)
    is_public: bool = True
    allow_comments: bool = True
    allow_remixes: bool = True

class SnapCastUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    content: Optional[str] = Field(None, min_length=1, max_length=2000)
    category: Optional[Category] = None
    tags: Optional[List[str]] = Field(None, max_items=10)
    is_public: Optional[bool] = None
    allow_comments: Optional[bool] = None
    allow_remixes: Optional[bool] = None

class SnapCastResponse(BaseModel):
    id: str
    title: str
    content: str
    user: UserResponse
    voice_type: VoiceType
    category: Category
    tags: List[str]
    audio_url: Optional[str]
    duration: Optional[int]
    waveform: List[int]
    likes: int
    remixes: int
    shares: int
    comments: int
    is_public: bool
    allow_comments: bool
    allow_remixes: bool
    created_at: datetime
    updated_at: datetime

# Like Model
class Like(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: PyObjectId
    snapcast_id: PyObjectId
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# Follow Model
class Follow(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    follower_id: PyObjectId
    following_id: PyObjectId
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# Comment Model
class Comment(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    snapcast_id: PyObjectId
    user_id: PyObjectId
    content: str = Field(..., min_length=1, max_length=500)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class CommentCreate(BaseModel):
    content: str = Field(..., min_length=1, max_length=500)

class CommentResponse(BaseModel):
    id: str
    user: UserResponse
    content: str
    created_at: datetime

# Token Models
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[str] = None

# Response Models
class ErrorResponse(BaseModel):
    detail: str
    error_code: Optional[str] = None

class SuccessResponse(BaseModel):
    message: str
    data: Optional[dict] = None

# Feed and Search Models
class FeedQuery(BaseModel):
    category: Optional[Category] = None
    search: Optional[str] = None
    tags: Optional[List[str]] = None
    sort_by: str = "trending"  # trending, recent, popular
    limit: int = Field(default=20, le=100)
    skip: int = Field(default=0, ge=0)

class VoiceGenerationRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=2000)
    voice_type: VoiceType
    format: str = "mp3"
    sample_rate: int = 44100

class VoiceGenerationResponse(BaseModel):
    success: bool
    audio_url: Optional[str] = None
    duration: Optional[int] = None
    waveform: Optional[List[int]] = None
    message: str