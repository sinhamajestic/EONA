// Mock data for SnapCast - The TikTok for Audio

export const mockUsers = [
  {
    id: 1,
    username: "voice_creator_1",
    displayName: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b2fd?w=150&h=150&fit=crop&crop=face",
    verified: true,
    followers: 12500,
    following: 340
  },
  {
    id: 2,
    username: "audio_master",
    displayName: "Alex Rivera",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    verified: false,
    followers: 8900,
    following: 180
  },
  {
    id: 3,
    username: "story_teller",
    displayName: "Maya Patel",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    verified: true,
    followers: 34200,
    following: 125
  }
];

export const mockSnapCasts = [
  {
    id: 1,
    title: "Morning Motivation Blast",
    content: "Every morning is a fresh start. Today, I'm choosing to focus on progress over perfection. Small steps lead to big changes!",
    user: mockUsers[0],
    voiceType: "Murf Excited",
    duration: 23,
    category: "Motivation",
    tags: ["motivation", "morning", "mindset"],
    likes: 1247,
    remixes: 89,
    shares: 156,
    comments: 78,
    createdAt: "2025-01-02T08:30:00Z",
    waveform: [12, 8, 16, 20, 14, 18, 10, 22, 16, 12, 8, 14, 18, 16, 10, 24, 14, 16, 12, 8, 20, 15, 18, 12],
    isPlaying: false,
    audioUrl: null // Mock - would contain actual audio URL
  },
  {
    id: 2,
    title: "Tech News Update",
    content: "Breaking: OpenAI just announced their latest model! This could be a game changer for content creators. Here's what you need to know...",
    user: mockUsers[1],
    voiceType: "Murf Professional",
    duration: 45,
    category: "News",
    tags: ["tech", "ai", "news"],
    likes: 892,
    remixes: 234,
    shares: 67,
    comments: 123,
    createdAt: "2025-01-02T14:15:00Z",
    waveform: [16, 12, 20, 24, 18, 22, 14, 26, 20, 16, 12, 18, 22, 20, 14, 28, 18, 20, 16, 12, 24, 19, 22, 16],
    isPlaying: false,
    audioUrl: null
  },
  {
    id: 3,
    title: "Quick Cooking Tip",
    content: "Pro chef tip: Add a pinch of salt to your coffee grounds before brewing. It reduces bitterness and enhances the natural flavors!",
    user: mockUsers[2],
    voiceType: "Murf Friendly",
    duration: 18,
    category: "Lifestyle",
    tags: ["cooking", "tips", "coffee"],
    likes: 2341,
    remixes: 445,
    shares: 289,
    comments: 167,
    createdAt: "2025-01-02T16:45:00Z",
    waveform: [8, 6, 10, 14, 12, 16, 8, 18, 12, 10, 6, 12, 14, 12, 8, 20, 12, 14, 10, 6, 16, 11, 14, 8],
    isPlaying: false,
    audioUrl: null
  },
  {
    id: 4,
    title: "Mindfulness Moment",
    content: "Take a deep breath with me. In for 4... hold for 4... out for 4. Remember, this moment is all we truly have. Be present.",
    user: mockUsers[0],
    voiceType: "Murf Calm",
    duration: 32,
    category: "Wellness",
    tags: ["mindfulness", "meditation", "breathe"],
    likes: 1876,
    remixes: 123,
    shares: 345,
    comments: 234,
    createdAt: "2025-01-02T19:20:00Z",
    waveform: [6, 4, 8, 12, 10, 14, 6, 16, 10, 8, 4, 10, 12, 10, 6, 18, 10, 12, 8, 4, 14, 9, 12, 6],
    isPlaying: false,
    audioUrl: null
  }
];

export const mockVoiceTypes = [
  { id: 1, name: "Murf Excited", description: "High energy, enthusiastic tone", category: "Energy" },
  { id: 2, name: "Murf Professional", description: "Clear, authoritative business voice", category: "Business" },
  { id: 3, name: "Murf Friendly", description: "Warm, approachable conversational tone", category: "Casual" },
  { id: 4, name: "Murf Calm", description: "Soothing, peaceful meditation voice", category: "Wellness" },
  { id: 5, name: "Murf Playful", description: "Fun, lighthearted comedy voice", category: "Entertainment" },
  { id: 6, name: "Murf Dramatic", description: "Intense, storytelling voice", category: "Creative" }
];

export const mockCategories = [
  { id: 1, name: "Motivation", icon: "💪", color: "from-orange-500 to-red-500" },
  { id: 2, name: "News", icon: "📰", color: "from-blue-500 to-indigo-500" },
  { id: 3, name: "Lifestyle", icon: "🌟", color: "from-pink-500 to-purple-500" },
  { id: 4, name: "Wellness", icon: "🧘", color: "from-green-500 to-teal-500" },
  { id: 5, name: "Comedy", icon: "😂", color: "from-yellow-500 to-orange-500" },
  { id: 6, name: "Education", icon: "📚", color: "from-purple-500 to-indigo-500" },
  { id: 7, name: "Tech", icon: "💻", color: "from-gray-500 to-blue-500" },
  { id: 8, name: "Creative", icon: "🎨", color: "from-pink-500 to-red-500" }
];

export const mockTrendingTags = [
  "#MondayMotivation", "#TechNews", "#LifeHacks", "#Mindfulness", 
  "#QuickTips", "#AIVoice", "#CreatorLife", "#DailyWisdom",
  "#BreakingNews", "#Wellness", "#Productivity", "#Inspiration"
];

// Mock API responses
export const mockAuthResponse = {
  user: {
    id: 1,
    username: "new_user",
    email: "user@example.com",
    displayName: "New User",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    verified: false,
    followers: 0,
    following: 0,
    createdAt: new Date().toISOString()
  },
  token: "mock_jwt_token_here"
};

export const mockCreateResponse = {
  success: true,
  snapcast: {
    id: Date.now(),
    title: "New SnapCast",
    content: "This is a newly created SnapCast!",
    user: mockAuthResponse.user,
    voiceType: "Murf Friendly",
    duration: 15,
    category: "General",
    tags: ["new", "test"],
    likes: 0,
    remixes: 0,
    shares: 0,
    comments: 0,
    createdAt: new Date().toISOString(),
    waveform: [8, 6, 10, 14, 12, 16, 8, 18, 12, 10, 6, 12, 14, 12, 8, 20],
    isPlaying: false,
    audioUrl: null
  }
};