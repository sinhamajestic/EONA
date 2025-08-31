import requests
import json
import time
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

API_BASE = "http://localhost:8000/api/v1"
API_KEY = os.getenv("API_KEY", "your-secret-api-key") # Load from .env

if API_KEY == "your-secret-api-key":
    print("⚠️ WARNING: API_KEY not found in .env file. Using default. Tests may fail.")

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

def test_health_check():
    """Test the health check endpoint"""
    print("\n--- Testing: Health Check ---")
    try:
        response = requests.get(f"{API_BASE}/health")
        response.raise_for_status()
        print(f"✅ Success! Health check passed.")
        print("Response:", response.json())
    except requests.exceptions.RequestException as e:
        print(f"❌ FAILED - Could not connect to the server: {e}")

def test_get_voices():
    """Test getting available voices"""
    print("\n--- Testing: Get Available Voices ---")
    try:
        response = requests.get(f"{API_BASE}/voices", headers=headers)
        response.raise_for_status()
        print("✅ Success! Fetched voices.")
        print("Available Voices:", json.dumps(response.json(), indent=2))
    except requests.exceptions.RequestException as e:
        print(f"❌ FAILED: {e.response.status_code} - {e.response.text}")


def test_get_emotions():
    """Test getting available emotions"""
    print("\n--- Testing: Get Available Emotions ---")
    try:
        response = requests.get(f"{API_BASE}/emotions", headers=headers)
        response.raise_for_status()
        print("✅ Success! Fetched emotions.")
        print("Available Emotions:", json.dumps(response.json(), indent=2))
    except requests.exceptions.RequestException as e:
        print(f"❌ FAILED: {e.response.status_code} - {e.response.text}")


def test_tts_generation():
    """Test TTS generation with different scenarios"""
    test_cases = [
        {
            "name": "Energetic Presentation",
            "data": { "script": "Welcome everyone to today's exciting presentation! We have some incredible news to share.", "voice_model": "sarah", "emotion_tone": "energetic", "purpose": "presentation" }
        },
        {
            "name": "Calm Meditation",
            "data": { "script": "Take a deep breath and relax. Feel the tension leaving your body as you focus on the moment.", "voice_model": "emma", "emotion_tone": "calm", "purpose": "meditation" }
        },
        {
            "name": "Caring Educational",
            "data": { "script": "Learning new things can be challenging, but remember that every expert was once a beginner. Be patient.", "voice_model": "lisa", "emotion_tone": "caring", "purpose": "teaching" }
        }
    ]
    
    for test_case in test_cases:
        print(f"\n--- Testing TTS Generation: {test_case['name']} ---")
        start_time = time.time()
        try:
            response = requests.post(f"{API_BASE}/tts/generate", headers=headers, json=test_case['data'], timeout=20)
            response.raise_for_status()
            result = response.json()
            print(f"✅ Success! Processing time: {result['processing_time']:.2f}s")
            print(f"Request ID: {result['request_id']}")
            print(f"Audio URL: {result['audio_url']}")
            print(f"Enhanced Script Preview: {result['enhanced_script'][:80]}...")
        except requests.exceptions.RequestException as e:
            print(f"❌ Failed: {e.response.status_code} - {e.response.text}")
        end_time = time.time()
        print(f"Total request time: {end_time - start_time:.2f}s")

def test_nsfw_content():
    """Test NSFW content filtering"""
    print("\n--- Testing: NSFW Content Filtering ---")
    
    test_scripts = [
        {"script": "This is a completely normal content about cooking recipes.", "should_pass": True},
        {"script": "This content contains explicit sexual material and violence.", "should_pass": False},
        {"script": "Let's discuss some adult topics that are inappropriate.", "should_pass": False}
    ]
    
    for i, test in enumerate(test_scripts):
        print(f"Testing script {i+1}: '{test['script'][:30]}...' (Should {'pass' if test['should_pass'] else 'be blocked'})")
        try:
            response = requests.post(
                f"{API_BASE}/tts/generate",
                headers=headers,
                json={"script": test['script'], "voice_model": "alex", "emotion_tone": "calm", "purpose": "teaching"},
                timeout=20
            )
            
            if test['should_pass']:
                if response.ok:
                    print(f"✅ PASSED - Correctly allowed. Status: {response.status_code}")
                else:
                    print(f"❌ FAILED - Unexpectedly blocked. Status: {response.status_code}")
            else: # Should be blocked
                if not response.ok and response.status_code == 400:
                     print(f"✅ PASSED - Correctly blocked. Status: {response.status_code}")
                else:
                    print(f"❌ FAILED - Unexpectedly allowed. Status: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"❌ FAILED - Request error: {e}")


def test_user_history():
    """Test user history endpoint"""
    print("\n--- Testing: User History ---")
    try:
        response = requests.get(f"{API_BASE}/history?limit=5", headers=headers)
        response.raise_for_status()
        history = response.json()
        print(f"✅ Success! Found {len(history['history'])} historical requests.")
        for req in history['history']:
            print(f"- {req['created_at']}: {req['voice_model']} ({req['emotion_tone']})")
    except requests.exceptions.RequestException as e:
        print(f"Failed to get history: {e.response.status_code}")


if __name__ == "__main__":
    print("🚀 Starting EONA API Tests...\n")
    test_health_check()
    test_get_voices()
    test_get_emotions()
    test_tts_generation()
    test_nsfw_content()
    test_user_history()
    print("\n✅ All tests completed!")

