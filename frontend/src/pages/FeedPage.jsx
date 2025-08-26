import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { 
  Play, Pause, Heart, Repeat, Share, MessageCircle, 
  Search, Filter, TrendingUp, Clock, Users
} from 'lucide-react';
import { mockSnapCasts, mockCategories, mockTrendingTags } from '../mock';

export const FeedPage = () => {
  const [snapcasts, setSnapcasts] = useState(mockSnapCasts);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');

  const handlePlayPause = (id) => {
    setCurrentPlaying(currentPlaying === id ? null : id);
    // Update the snapcast playing state
    setSnapcasts(prev => prev.map(cast => ({
      ...cast,
      isPlaying: cast.id === id ? !cast.isPlaying : false
    })));
  };

  const handleLike = (id) => {
    setSnapcasts(prev => prev.map(cast => 
      cast.id === id 
        ? { ...cast, likes: cast.likes + 1 }
        : cast
    ));
  };

  const formatDuration = (seconds) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const filteredSnapcasts = snapcasts.filter(cast => {
    const matchesSearch = cast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cast.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cast.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           cast.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="heading-large text-gray-900 mb-2">
            Discover SnapCasts
          </h1>
          <p className="body-standard text-gray-600">
            Explore trending audio content from creators worldwide
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4 animate-slide-up delay-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search SnapCasts, creators, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 form-input"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="btn-secondary">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                <option value="trending">Trending</option>
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              className="cursor-pointer hover-scale"
              onClick={() => setSelectedCategory('all')}
            >
              All
            </Badge>
            {mockCategories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.name ? 'default' : 'outline'}
                className="cursor-pointer hover-scale"
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.icon} {category.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Trending Tags */}
        <div className="mb-8 animate-slide-up delay-200">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Trending Now
          </h3>
          <div className="flex flex-wrap gap-2">
            {mockTrendingTags.slice(0, 8).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-purple-600 border-purple-200 hover-scale cursor-pointer">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {filteredSnapcasts.map((snapcast, index) => (
            <Card 
              key={snapcast.id} 
              className={`p-6 hover-lift animate-slide-up delay-${(index % 3 + 1) * 100}`}
            >
              {/* User Info */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={snapcast.user.avatar} alt={snapcast.user.displayName} />
                  <AvatarFallback>{snapcast.user.displayName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-900">{snapcast.user.displayName}</h4>
                    {snapcast.user.verified && <span className="text-blue-500">✓</span>}
                  </div>
                  <p className="text-sm text-gray-500">@{snapcast.user.username}</p>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {new Date(snapcast.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Content */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{snapcast.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {snapcast.category}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-3">{snapcast.content}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Voice: {snapcast.voiceType}</span>
                  <span>•</span>
                  <span>{formatDuration(snapcast.duration)}</span>
                </div>
              </div>

              {/* Waveform */}
              <div className="mb-6">
                <div className="flex items-center justify-center gap-1 h-16 bg-gray-50 rounded-lg p-4">
                  {snapcast.waveform.map((height, i) => (
                    <div 
                      key={i}
                      className={`rounded-full transition-all duration-200 ${
                        snapcast.isPlaying 
                          ? 'bg-gradient-to-t from-purple-500 to-pink-500' 
                          : 'bg-gray-300 hover:bg-purple-300'
                      }`}
                      style={{
                        width: '3px',
                        height: `${height}px`
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Play Button */}
              <div className="flex items-center justify-center mb-6">
                <Button
                  onClick={() => handlePlayPause(snapcast.id)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
                    snapcast.isPlaying
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                  }`}
                >
                  {snapcast.isPlaying ? (
                    <Pause size={24} className="text-white" fill="white" />
                  ) : (
                    <Play size={24} className="text-white" fill="white" />
                  )}
                </Button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {snapcast.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => handleLike(snapcast.id)}
                    className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors hover-scale"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="text-sm">{snapcast.likes.toLocaleString()}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-purple-500 transition-colors hover-scale">
                    <Repeat className="w-5 h-5" />
                    <span className="text-sm">{snapcast.remixes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors hover-scale">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{snapcast.comments}</span>
                  </button>
                </div>
                <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors hover-scale">
                  <Share className="w-5 h-5" />
                  <span className="text-sm">{snapcast.shares}</span>
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button className="btn-primary px-8">
            Load More SnapCasts
          </Button>
        </div>
      </div>
    </div>
  );
};