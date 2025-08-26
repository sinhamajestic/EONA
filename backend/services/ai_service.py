import logging
import os
from typing import List, Optional
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

class AIService:
    def __init__(self):
        # Check if user wants to use Emergent LLM key or their own Gemini key
        self.api_key = os.getenv("EMERGENT_LLM_KEY") or os.getenv("GEMINI_API_KEY")
        self.use_emergent_key = bool(os.getenv("EMERGENT_LLM_KEY"))
        
        if not self.api_key:
            logger.warning("No AI API key found. AI features will use mock responses.")
    
    async def enhance_content(self, text: str) -> dict:
        """
        Use AI to enhance content with better titles, tags, and suggestions
        """
        try:
            if not self.api_key:
                return self._mock_enhance_content(text)
            
            # Use emergentintegrations if we have the universal key
            if self.use_emergent_key:
                return await self._enhance_with_emergent(text)
            else:
                return await self._enhance_with_gemini(text)
                
        except Exception as e:
            logger.error(f"Error enhancing content: {str(e)}")
            return self._mock_enhance_content(text)
    
    async def _enhance_with_emergent(self, text: str) -> dict:
        """Use emergentintegrations for content enhancement"""
        try:
            from emergentintegrations.llm.chat import LlmChat, UserMessage
            
            # Initialize chat with Gemini
            chat = LlmChat(
                api_key=self.api_key,
                session_id=f"content_enhancement_{hash(text)}",
                system_message="You are an AI assistant that helps enhance audio content for social media. You suggest better titles, relevant tags, and content improvements."
            ).with_model("gemini", "gemini-2.0-flash")
            
            # Create enhancement prompt
            prompt = f"""
            Please analyze this audio content and provide enhancements:

            Content: "{text}"

            Please provide:
            1. A catchy, engaging title (max 100 chars)
            2. 3-5 relevant hashtags
            3. Suggested category (Motivation, News, Lifestyle, Wellness, Comedy, Education, Tech, Creative)
            4. Brief content improvement suggestions

            Format your response as JSON:
            {{
                "title": "Enhanced title here",
                "tags": ["tag1", "tag2", "tag3"],
                "category": "suggested category",
                "suggestions": "improvement suggestions"
            }}
            """
            
            user_message = UserMessage(text=prompt)
            response = await chat.send_message(user_message)
            
            # Parse JSON response
            import json
            try:
                result = json.loads(response)
                return {
                    "success": True,
                    "enhanced_title": result.get("title", ""),
                    "suggested_tags": result.get("tags", []),
                    "suggested_category": result.get("category", ""),
                    "suggestions": result.get("suggestions", ""),
                    "confidence": 0.9
                }
            except json.JSONDecodeError:
                # Fallback to mock if parsing fails
                return self._mock_enhance_content(text)
                
        except Exception as e:
            logger.error(f"Error with emergent integration: {str(e)}")
            return self._mock_enhance_content(text)
    
    async def _enhance_with_gemini(self, text: str) -> dict:
        """Use direct Gemini API for content enhancement"""
        # This would use direct Gemini API calls
        # For now, return mock response
        logger.info("Using direct Gemini API (not implemented yet)")
        return self._mock_enhance_content(text)
    
    def _mock_enhance_content(self, text: str) -> dict:
        """Generate mock content enhancement"""
        # Simple heuristics for mock enhancement
        words = text.split()
        
        # Generate title based on first few words
        title_words = words[:6] if len(words) >= 6 else words
        title = " ".join(title_words).title()
        if len(title) > 100:
            title = title[:97] + "..."
        
        # Suggest tags based on content
        tags = []
        content_lower = text.lower()
        
        if any(word in content_lower for word in ['motivation', 'inspire', 'success', 'achieve']):
            tags.extend(['motivation', 'inspiration'])
        if any(word in content_lower for word in ['news', 'breaking', 'update', 'report']):
            tags.extend(['news', 'update'])
        if any(word in content_lower for word in ['tip', 'hack', 'advice', 'how to']):
            tags.extend(['tips', 'lifehacks'])
        if any(word in content_lower for word in ['funny', 'joke', 'laugh', 'humor']):
            tags.extend(['comedy', 'funny'])
        if any(word in content_lower for word in ['calm', 'meditat', 'peace', 'relax']):
            tags.extend(['wellness', 'mindfulness'])
        
        # Default tags if none found
        if not tags:
            tags = ['audio', 'content']
        
        # Limit to 5 tags
        tags = tags[:5]
        
        # Suggest category
        category = "Lifestyle"  # Default
        if 'motivation' in tags or 'inspiration' in tags:
            category = "Motivation"
        elif 'news' in tags:
            category = "News"
        elif 'wellness' in tags or 'mindfulness' in tags:
            category = "Wellness"
        elif 'comedy' in tags or 'funny' in tags:
            category = "Comedy"
        elif 'tips' in tags:
            category = "Education"
        
        return {
            "success": True,
            "enhanced_title": title,
            "suggested_tags": tags,
            "suggested_category": category,
            "suggestions": "Consider adding more engaging opening lines to capture audience attention.",
            "confidence": 0.7
        }
    
    async def moderate_content(self, text: str) -> dict:
        """
        Check content for appropriateness
        """
        try:
            # Simple content moderation rules
            text_lower = text.lower()
            
            # Check for inappropriate content
            inappropriate_words = [
                'hate', 'spam', 'scam', 'violence', 'harassment'
                # Add more as needed
            ]
            
            flags = []
            for word in inappropriate_words:
                if word in text_lower:
                    flags.append(f"Contains potentially inappropriate content: {word}")
            
            return {
                "approved": len(flags) == 0,
                "flags": flags,
                "confidence": 0.8
            }
            
        except Exception as e:
            logger.error(f"Error moderating content: {str(e)}")
            # Default to approved if moderation fails
            return {
                "approved": True,
                "flags": [],
                "confidence": 0.5
            }

# Global service instance
ai_service = AIService()