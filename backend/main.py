import os
import re
import json
import logging
import asyncio
from typing import Dict, List, Optional, Tuple
from enum import Enum
import hashlib
import time
from datetime import datetime, timedelta

# Web framework and API
from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks, Request
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, field_validator

# AI and NLP
import google.generativeai as genai
from textblob import TextBlob
import nltk

# Audio processing
from pydub import AudioSegment
import io

# Database and caching
import redis
from sqlalchemy.orm import Session

# Local Imports
from database import Base, engine, SessionLocal, TTSRequest, VoiceModel, EmotionTone, Purpose, User

# --- ADDED FOR AUTH ---
from jose import JWTError, jwt
from requests_oauthlib import OAuth2Session
import requests
# --------------------

# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv()

# --- App Setup ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', handlers=[logging.FileHandler('logs/eona_engine.log'), logging.StreamHandler()])
logger = logging.getLogger(__name__)

app = FastAPI(title="EONA TTS API", description="AI-Powered Text-to-Speech with Emotion Enhancement", version="1.0.0")
# IMPORTANT: Updated CORS for React default port
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

security = HTTPBearer()
Base.metadata.create_all(bind=engine)
redis_client = redis.Redis(host=os.getenv("REDIS_HOST", "localhost"), port=int(os.getenv("REDIS_PORT", 6379)), db=0, decode_responses=True)


# --- Utility Functions ---
# MOVED THIS FUNCTION UP so it's defined before it's used.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def generate_request_id(script: str, voice: str, tone: str) -> str:
    content = f"{script}{voice}{tone}{time.time()}"
    return hashlib.sha256(content.encode()).hexdigest()[:16]


# --- AUTHENTICATION SETUP ---
SECRET_KEY = os.getenv("SECRET_KEY", "a_very_secret_key_that_should_be_in_env")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:8000/auth/google/callback")

AUTHORIZATION_URL = "https://accounts.google.com/o/oauth2/v2/auth"
TOKEN_URL = "https://www.googleapis.com/oauth2/v4/token"
SCOPE = ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"]

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(status_code=401, detail="Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise credentials_exception
    return user

# --- Pydantic Models ---
class TTSRequestModel(BaseModel):
    script: str
    voice_model: VoiceModel
    emotion_tone: EmotionTone
    purpose: Purpose
    user_context: Optional[str] = None

class TTSResponse(BaseModel):
    request_id: str
    audio_url: str
    enhanced_script: str
    processing_time: float
    emotion_analysis: Dict

class ScriptGenerationRequest(BaseModel):
    idea: str
    tone: EmotionTone
    purpose: Purpose

class ScriptGenerationResponse(BaseModel):
    script: str
    
class Token(BaseModel):
    access_token: str
    token_type: str

# --- Core Logic Classes (Unchanged from your original file) ---
class ContentSafetyChecker:
    def __init__(self):
        self.nsfw_patterns = [r'\b(sex|porn|nude|naked|explicit|adult|erotic)\b', r'\b(violence|kill|murder|death|blood|gore)\b', r'\b(drug|cocaine|heroin|marijuana|weed)\b', r'\b(hate|racist|nazi|terrorist)\b']
        self.severity_threshold = 0.7
    def check_content(self, text: str) -> Tuple[bool, str, float]:
        text_lower = text.lower()
        for pattern in self.nsfw_patterns:
            matches = re.findall(pattern, text_lower, re.IGNORECASE)
            if matches: return False, f"Content contains inappropriate terms: {matches}", 0.9
        try:
            safety_score = self._ai_safety_check(text)
            if safety_score > self.severity_threshold: return False, "AI safety check flagged potential issues", safety_score
        except Exception as e: logger.warning(f"AI safety check failed: {e}")
        return True, "Content appears safe", 0.0
    def _ai_safety_check(self, text: str) -> float:
        try:
            genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
            model = genai.GenerativeModel('gemini-1.5-flash-latest')
            safety_prompt = f'Analyze the following text for inappropriate content. Provide a safety score from 0-1 (0=safe, 1=inappropriate).\nText: "{text}"\nRespond with only a number between 0 and 1.'
            response = model.generate_content(safety_prompt)
            return max(0, min(1, float(response.text.strip())))
        except Exception as e:
            logger.error(f"Gemini safety check error: {e}")
            return 0.0

class EmotionEnhancer:
    def __init__(self):
        try: nltk.data.find('vader_lexicon')
        except LookupError: nltk.download('vader_lexicon', quiet=True)
    async def generate_script_from_idea(self, idea: str, tone: EmotionTone, purpose: Purpose) -> str:
        try:
            genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
            model = genai.GenerativeModel('gemini-1.5-flash-latest')
            prompt = f"You are a creative writer for short-form audio. Based on this idea, write a short, engaging script of 50-100 words.\nThe script should be for a '{purpose.value}' and have a '{tone.value}' tone.\n\nIdea: \"{idea}\"\n\nReturn only the generated script."
            response = await asyncio.to_thread(model.generate_content, prompt)
            return response.text.strip()
        except Exception as e:
            logger.error(f"Gemini script generation error: {e}")
            return "Error generating script."
    async def enhance_script(self, script: str, tone: EmotionTone, purpose: Purpose, context: str = "") -> Tuple[str, Dict]:
        try:
            genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
            model = genai.GenerativeModel('gemini-1.5-flash-latest')
            prompt = f"Enhance this script to better convey a '{tone.value}' tone for a '{purpose.value}'. Maintain meaning, add emotion, adjust flow. Keep length similar.\n\nOriginal: \"{script}\"\nContext: {context}\n\nReturn only the enhanced script."
            response = await asyncio.to_thread(model.generate_content, prompt)
            enhanced_script = response.text.strip()
            if len(enhanced_script) < len(script) * 0.5 or len(enhanced_script) > len(script) * 2:
                logger.warning("Enhanced script length seems incorrect, using original")
                return script, {"error": "Enhancement failed", "enhancement_applied": False}
            return enhanced_script, {"target_tone": tone.value, "purpose": purpose.value, "enhancement_applied": True}
        except Exception as e:
            logger.error(f"Script enhancement failed: {e}")
            return script, {"error": str(e), "enhancement_applied": False}

class MurfAIClient:
    async def generate_speech(self, script: str, voice_model: VoiceModel, emotion_tone: EmotionTone) -> Tuple[str, float]:
        start_time = time.time()
        logger.info(f"Generating speech for script hash: {hashlib.md5(script.encode()).hexdigest()}")
        await asyncio.sleep(2) # Simulate API latency
        script_hash = hashlib.md5(script.encode()).hexdigest()
        mock_audio_url = f"https://storage.murvoice.com/audio/{script_hash}.mp3"
        processing_time = time.time() - start_time
        return mock_audio_url, processing_time
# -------------------------------------------------------------------

# --- Initialize Components ---
content_checker = ContentSafetyChecker()
emotion_enhancer = EmotionEnhancer()
murf_client = MurfAIClient()

# --- AUTHENTICATION ENDPOINTS ---
@app.get("/auth/google")
async def login_google():
    google = OAuth2Session(GOOGLE_CLIENT_ID, scope=SCOPE, redirect_uri=GOOGLE_REDIRECT_URI)
    authorization_url, state = google.authorization_url(AUTHORIZATION_URL, access_type="offline", prompt="select_account")
    return RedirectResponse(authorization_url)

@app.get("/auth/google/callback")
async def auth_google_callback(request: Request, db: Session = Depends(get_db)):
    try:
        google = OAuth2Session(GOOGLE_CLIENT_ID, redirect_uri=GOOGLE_REDIRECT_URI)
        token = google.fetch_token(TOKEN_URL, client_secret=GOOGLE_CLIENT_SECRET, authorization_response=str(request.url))
        
        user_info_res = google.get('https://www.googleapis.com/oauth2/v3/userinfo')
        if not user_info_res.ok:
            raise HTTPException(status_code=400, detail="Failed to fetch user info from Google.")
            
        user_info = user_info_res.json()
        google_id = user_info['sub']
        email = user_info['email']
        name = user_info.get('name', '')

        user = db.query(User).filter(User.google_id == google_id).first()
        if not user:
            user = User(google_id=google_id, email=email, name=name)
            db.add(user)
            db.commit()
            db.refresh(user)
        
        access_token = create_access_token(data={"sub": str(user.id)})
        
        redirect_url = f"http://localhost:3000?token={access_token}"
        return RedirectResponse(redirect_url)

    except Exception as e:
        logger.error(f"Google auth callback error: {e}")
        return RedirectResponse(f"http://localhost:3000?error=auth_failed")

@app.get("/api/v1/users/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return {"email": current_user.email, "name": current_user.name}
# --------------------------------

# --- API Endpoints ---
@app.post("/api/v1/generate-script", response_model=ScriptGenerationResponse)
async def generate_script(request: ScriptGenerationRequest, current_user: User = Depends(get_current_user)):
    if len(request.idea.strip()) < 5: raise HTTPException(status_code=400, detail="Idea must be at least 5 characters long.")
    generated_script = await emotion_enhancer.generate_script_from_idea(request.idea, request.tone, request.purpose)
    return ScriptGenerationResponse(script=generated_script)

@app.post("/api/v1/tts/generate", response_model=TTSResponse)
async def generate_tts(request: TTSRequestModel, background_tasks: BackgroundTasks, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    is_safe, reason, _ = content_checker.check_content(request.script)
    if not is_safe:
        logger.warning(f"Content blocked: {reason}")
        raise HTTPException(status_code=400, detail=f"Content not allowed: {reason}")
    
    request_id = generate_request_id(request.script, request.voice_model.value, request.emotion_tone.value)
    cache_key = f"tts:{hashlib.md5(request.script.encode()).hexdigest()}:{request.voice_model.value}:{request.emotion_tone.value}"
    cached_result = redis_client.get(cache_key)
    if cached_result:
        logger.info(f"Returning cached result for request {request_id}")
        return TTSResponse(**json.loads(cached_result))
        
    enhanced_script, emotion_analysis = await emotion_enhancer.enhance_script(request.script, request.emotion_tone, request.purpose, request.user_context or "")
    audio_url, processing_time = await murf_client.generate_speech(enhanced_script, request.voice_model, request.emotion_tone)
    
    response_data = {"request_id": request_id, "audio_url": audio_url, "enhanced_script": enhanced_script, "processing_time": processing_time, "emotion_analysis": emotion_analysis}
    redis_client.setex(cache_key, 86400, json.dumps(response_data))
    
    db_request = TTSRequest(user_id=current_user.id, script_hash=cache_key, original_script=request.script, enhanced_script=enhanced_script, voice_model=request.voice_model.value, emotion_tone=request.emotion_tone.value, purpose=request.purpose.value, audio_url=audio_url, processing_time=processing_time, status="completed")
    db.add(db_request)
    db.commit()
    
    logger.info(f"Successfully generated TTS for request {request_id}")
    return TTSResponse(**response_data)

@app.get("/api/v1/voices")
async def get_available_voices(current_user: User = Depends(get_current_user)):
    return {"voices": [{"id": voice.value, "name": voice.value.title()} for voice in VoiceModel]}

@app.get("/api/v1/emotions")
async def get_available_emotions(api_key: str = Depends(verify_api_key)):
    """Get list of available emotion tones"""
    return {"emotions": [{"id": emotion.value, "name": emotion.value.title()} for emotion in EmotionTone]}

@app.get("/api/v1/purposes")
async def get_available_purposes(api_key: str = Depends(verify_api_key)):
    """Get list of available purposes"""
    return {"purposes": [{"id": purpose.value, "name": purpose.value.title()} for purpose in Purpose]}

@app.get("/api/v1/history")
async def get_user_history(

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
