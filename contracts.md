# SnapCast API Contracts & Integration Plan

## Backend Architecture Overview

### Technology Stack
- **Backend**: FastAPI (Python)
- **Database**: MongoDB with Motor (async driver)
- **Authentication**: JWT tokens
- **External APIs**: Murf API (voice generation), Gemini Pro/Flash 2.5 (AI features)

## Database Models

### User Model
```python
{
  "_id": ObjectId,
  "username": str,
  "email": str,
  "password_hash": str,
  "display_name": str,
  "avatar_url": str,
  "verified": bool,
  "followers": int,
  "following": int,
  "bio": str,
  "created_at": datetime,
  "updated_at": datetime
}
```

### SnapCast Model
```python
{
  "_id": ObjectId,
  "title": str,
  "content": str,
  "user_id": ObjectId,
  "voice_type": str,
  "category": str,
  "tags": List[str],
  "audio_url": str,
  "duration": int,
  "waveform": List[int],
  "likes": int,
  "remixes": int,
  "shares": int,
  "comments": int,
  "is_public": bool,
  "allow_comments": bool,
  "allow_remixes": bool,
  "created_at": datetime,
  "updated_at": datetime
}
```

### Like Model
```python
{
  "_id": ObjectId,
  "user_id": ObjectId,
  "snapcast_id": ObjectId,
  "created_at": datetime
}
```

## API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/me` - Get current user profile

### SnapCast Endpoints
- `GET /api/snapcasts` - Get feed of snapcasts (with pagination, filtering)
- `POST /api/snapcasts` - Create new snapcast
- `GET /api/snapcasts/{id}` - Get specific snapcast
- `PUT /api/snapcasts/{id}` - Update snapcast (owner only)
- `DELETE /api/snapcasts/{id}` - Delete snapcast (owner only)
- `POST /api/snapcasts/{id}/like` - Like/unlike snapcast
- `POST /api/snapcasts/{id}/remix` - Create remix of snapcast

### Voice Generation Endpoints
- `POST /api/voice/generate` - Generate audio from text using Murf API
- `GET /api/voice/types` - Get available voice types
- `POST /api/voice/preview` - Preview voice with sample text

### User Endpoints
- `GET /api/users/{id}` - Get user profile
- `PUT /api/users/{id}` - Update user profile
- `GET /api/users/{id}/snapcasts` - Get user's snapcasts
- `POST /api/users/{id}/follow` - Follow/unfollow user

## Frontend-Backend Integration Plan

### Mock Data Replacement Strategy
1. **Authentication Flow**
   - Replace mock auth responses in `AuthPage.jsx`
   - Implement JWT token storage and management
   - Add authentication context provider

2. **Feed Page Integration**
   - Replace `mockSnapCasts` with API calls to `/api/snapcasts`
   - Implement infinite scroll pagination
   - Connect like, remix, share functionality

3. **Create Page Integration**
   - Connect voice generation to Murf API via `/api/voice/generate`
   - Implement audio file upload and storage
   - Replace mock creation with real API calls

4. **Real-time Features** (Future)
   - WebSocket connections for live updates
   - Push notifications for likes, comments

## External API Integration Requirements

### Murf API Integration
- **Purpose**: Convert text to realistic AI voices
- **Endpoints**: Voice generation, voice listing
- **Response**: Audio file URL, metadata
- **Error Handling**: Rate limits, API failures

### Gemini Pro/Flash 2.5 Integration  
- **Purpose**: Content enhancement, smart tagging, content moderation
- **Features**: Auto-generate titles, suggest tags, content analysis
- **Endpoints**: Text analysis, content generation

## Security Considerations
- JWT token validation on protected endpoints
- Input validation and sanitization
- Rate limiting for voice generation
- User permission checks for CRUD operations
- Audio file storage security

## File Storage Strategy
- **Audio Files**: Cloud storage (AWS S3 or similar)
- **User Avatars**: Cloud storage with CDN
- **Waveform Data**: Generated during upload, stored in database

## Error Handling Strategy
- Consistent error response format
- Graceful degradation for external API failures
- User-friendly error messages
- Logging for debugging

## Testing Strategy
- Unit tests for models and endpoints
- Integration tests for external APIs
- End-to-end tests for complete user flows
- Mock external API responses for reliable testing

## Performance Optimizations
- Database indexing for fast queries
- Caching for frequently accessed data
- Audio file compression and optimization
- Lazy loading for feed pagination

## Deployment Considerations
- Environment variables for API keys
- Database connection pooling
- Health check endpoints
- Monitoring and logging setup