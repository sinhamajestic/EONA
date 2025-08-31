import os
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Float, Enum as SQLAlchemyEnum, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base
from datetime import datetime
from enum import Enum

# --- Enums for API choices ---
class VoiceModel(str, Enum):
    alex = "alex"
    sarah = "sarah"
    mike = "mike"
    jenny = "jenny"
    david = "david"
    emma = "emma"
    chris = "chris"
    lisa = "lisa"

class EmotionTone(str, Enum):
    energetic = "energetic"
    calm = "calm"
    caring = "caring"
    expressive = "expressive"
    emotional = "emotional"
    confident = "confident"
    friendly = "friendly"
    authoritative = "authoritative"

class Purpose(str, Enum):
    teaching = "teaching"
    awareness = "awareness"
    storytelling = "storytelling"
    presentation = "presentation"
    meditation = "meditation"
    advertisement = "advertisement"
    podcast = "podcast"
    audiobook = "audiobook"


# --- Database Setup ---
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./data/eona.db")

engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


# --- Database Models ---

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    google_id = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class TTSRequest(Base):
    __tablename__ = "tts_requests"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id")) # Link to the User table
    script_hash = Column(String, unique=True, index=True)
    original_script = Column(Text)
    enhanced_script = Column(Text)
    voice_model = Column(String)
    emotion_tone = Column(String)
    purpose = Column(String)
    audio_url = Column(String)
    processing_time = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="pending")

# Create the database tables
# This will now create the 'users' table as well
Base.metadata.create_all(bind=engine)
