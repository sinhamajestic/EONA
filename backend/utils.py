#!/usr/bin/env python3
"""
Advanced Utilities for EONA TTS System
Includes analytics, batch processing, and admin tools
"""

import asyncio
import json
import csv
from datetime import datetime, timedelta
from typing import List, Dict, Optional, Tuple
import matplotlib.pyplot as plt
import pandas as pd
from sqlalchemy import func, and_
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging

# AI and NLP
import google.generativeai as genai
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

# Import from our new database.py file
from database import SessionLocal, TTSRequest, EmotionTone, VoiceModel, Purpose

logger = logging.getLogger(__name__)

# --- Emotion Enhancement Engine ---
class EmotionEnhancer:
    def __init__(self):
        try:
            nltk.data.find('vader_lexicon')
        except LookupError:
            nltk.download('vader_lexicon')
        
        self.sia = SentimentIntensityAnalyzer()

    async def enhance_script(self, script: str, tone: EmotionTone, purpose: Purpose, context: str = "") -> Tuple[str, Dict]:
        try:
            sentiment_scores = self.sia.polarity_scores(script)
            
            enhanced_script = await self._generate_enhanced_script(script, tone, purpose, context)
            
            emotion_analysis = {
                "original_sentiment": sentiment_scores,
                "target_tone": tone.value,
                "purpose": purpose.value,
                "enhancement_applied": True,
            }
            return enhanced_script, emotion_analysis
        except Exception as e:
            logger.error(f"Script enhancement failed: {e}")
            return script, {"error": str(e), "enhancement_applied": False}

    async def _generate_enhanced_script(self, script: str, tone: EmotionTone, purpose: Purpose, context: str) -> str:
        try:
            genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
            model = genai.GenerativeModel('gemini-1.5-flash-latest')
            
            enhancement_prompt = f"""
            You are an expert script writer specializing in emotional text-to-speech content.
            Original Script: "{script}"
            Target Tone: {tone.value}
            Purpose: {purpose.value}
            Context: {context}
            
            Enhance this script to better convey the specified emotion and serve the given purpose.
            Guidelines:
            1. Maintain the original meaning and key information.
            2. Add emotional language appropriate to the tone (e.g., for 'energetic', use more exclamation marks and exciting words; for 'calm', use softer language and longer sentences).
            3. Adjust sentence structure for better speech flow.
            4. Include natural pauses and emphasis where needed.
            5. Keep the enhanced version close to the original length.
            
            Return only the enhanced script without explanations.
            """
            
            response = await model.generate_content_async(enhancement_prompt)
            enhanced_script = response.text.strip()
            
            # Fallback to original if enhancement seems invalid
            if len(enhanced_script) < len(script) * 0.5 or len(enhanced_script) > len(script) * 2:
                logger.warning("Enhanced script length seems incorrect, using original")
                return script
                
            return enhanced_script
        except Exception as e:
            logger.error(f"Gemini enhancement error: {e}")
            return script

# Other utility classes (Analytics, Batch Processing, Alerts) can go here
# For brevity, they are omitted but can be added back from previous versions if needed.

