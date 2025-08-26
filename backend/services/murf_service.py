import logging
import httpx
import json
from typing import Optional, List
from pathlib import Path
import tempfile
import os
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

class MurfService:
    def __init__(self):
        self.api_key = os.getenv("MURF_API_KEY")
        if not self.api_key:
            logger.warning("MURF_API_KEY not found. Voice generation will not work.")
        
        self.base_url = "https://api.murf.ai/v1"
        self.audio_output_dir = Path("/tmp/snapcast_audio")
        self.audio_output_dir.mkdir(exist_ok=True)
        
        # Voice mapping from our enum to Murf voice IDs
        self.voice_mapping = {
            "Murf Excited": "en-US-natalie-excited",
            "Murf Professional": "en-US-davis-professional", 
            "Murf Friendly": "en-US-sarah-friendly",
            "Murf Calm": "en-US-michael-calm",
            "Murf Playful": "en-US-emma-playful",
            "Murf Dramatic": "en-US-james-dramatic"
        }
    
    async def generate_audio(
        self,
        text: str,
        voice_type: str,
        format: str = "mp3",
        sample_rate: int = 44100
    ) -> tuple[Optional[str], Optional[int], Optional[List[int]]]:
        """
        Generate audio using Murf API (or mock for development)
        Returns: (audio_url, duration_seconds, waveform_data)
        """
        try:
            if not self.api_key:
                # Mock response for development
                return await self._generate_mock_audio(text, voice_type)
            
            voice_id = self.voice_mapping.get(voice_type, "en-US-natalie-excited")
            
            # Prepare request
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "text": text,
                "voice_id": voice_id,
                "format": format.upper(),
                "sample_rate": sample_rate
            }
            
            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.post(
                    f"{self.base_url}/synthesize",
                    headers=headers,
                    json=payload
                )
                
                if response.status_code == 200:
                    # Save audio file
                    audio_data = response.content
                    audio_filename = f"snapcast_{hash(text)}_{voice_type.replace(' ', '_')}.{format}"
                    audio_path = self.audio_output_dir / audio_filename
                    
                    with open(audio_path, 'wb') as f:
                        f.write(audio_data)
                    
                    # Generate mock waveform data
                    waveform = self._generate_waveform(len(text))
                    
                    # Estimate duration (rough calculation)
                    duration = max(5, len(text) // 10)  # ~10 chars per second
                    
                    return str(audio_path), duration, waveform
                else:
                    logger.error(f"Murf API error: {response.status_code} - {response.text}")
                    return await self._generate_mock_audio(text, voice_type)
                    
        except Exception as e:
            logger.error(f"Error generating audio: {str(e)}")
            return await self._generate_mock_audio(text, voice_type)
    
    async def _generate_mock_audio(self, text: str, voice_type: str) -> tuple[str, int, List[int]]:
        """Generate mock audio response for development"""
        # Create a mock audio file path
        audio_filename = f"mock_snapcast_{hash(text)}_{voice_type.replace(' ', '_')}.mp3"
        audio_path = self.audio_output_dir / audio_filename
        
        # Create empty file as placeholder
        audio_path.touch()
        
        # Generate mock waveform
        waveform = self._generate_waveform(len(text))
        
        # Estimate duration
        duration = max(5, len(text) // 10)
        
        logger.info(f"Generated mock audio: {audio_filename} ({duration}s)")
        return str(audio_path), duration, waveform
    
    def _generate_waveform(self, text_length: int) -> List[int]:
        """Generate mock waveform data based on text length"""
        import random
        
        # Generate realistic waveform pattern
        waveform_length = min(50, max(20, text_length // 10))
        waveform = []
        
        for i in range(waveform_length):
            # Create some pattern to make it look realistic
            base_height = 8 + (i % 5) * 2
            variation = random.randint(-3, 8)
            height = max(4, min(28, base_height + variation))
            waveform.append(height)
        
        return waveform
    
    def get_available_voices(self) -> List[dict]:
        """Get list of available voices"""
        return [
            {
                "id": "Murf Excited",
                "name": "Murf Excited", 
                "description": "High energy, enthusiastic tone",
                "category": "Energy"
            },
            {
                "id": "Murf Professional",
                "name": "Murf Professional",
                "description": "Clear, authoritative business voice", 
                "category": "Business"
            },
            {
                "id": "Murf Friendly",
                "name": "Murf Friendly",
                "description": "Warm, approachable conversational tone",
                "category": "Casual"
            },
            {
                "id": "Murf Calm",
                "name": "Murf Calm", 
                "description": "Soothing, peaceful meditation voice",
                "category": "Wellness"
            },
            {
                "id": "Murf Playful",
                "name": "Murf Playful",
                "description": "Fun, lighthearted comedy voice",
                "category": "Entertainment"
            },
            {
                "id": "Murf Dramatic",
                "name": "Murf Dramatic",
                "description": "Intense, storytelling voice", 
                "category": "Creative"
            }
        ]

# Global service instance
murf_service = MurfService()