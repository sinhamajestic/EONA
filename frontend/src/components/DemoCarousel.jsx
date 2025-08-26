import React, { useState } from 'react';
import { Button } from './ui/button';
import { Play, Pause, Volume2 } from 'lucide-react';

export const DemoCarousel = () => {
  const [currentPlaying, setCurrentPlaying] = useState(null);
  
  const demoClips = [
    {
      id: 1,
      title: "Motivation Monday",
      voice: "Murf Excited",
      duration: "20s",
      category: "Motivation",
      waveform: [12, 8, 16, 20, 14, 18, 10, 22, 16, 12, 8, 14, 18, 16, 10, 24, 14, 16, 12, 8]
    },
    {
      id: 2,
      title: "Calm Meditation",
      voice: "Murf Soothing", 
      duration: "30s",
      category: "Wellness",
      waveform: [8, 6, 10, 14, 12, 16, 8, 18, 12, 10, 6, 12, 14, 12, 8, 20, 12, 14, 10, 6]
    },
    {
      id: 3,
      title: "Comedy Byte",
      voice: "Murf Playful",
      duration: "15s", 
      category: "Comedy",
      waveform: [16, 12, 20, 24, 18, 22, 14, 26, 20, 16, 12, 18, 22, 20, 14, 28, 18, 20, 16, 12]
    }
  ];

  const handlePlayPause = (id) => {
    setCurrentPlaying(currentPlaying === id ? null : id);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="heading-large text-gray-900 mb-4">
            Listen to SnapCasts
          </h2>
          <p className="body-large text-gray-600 max-w-2xl mx-auto">
            Preview trending audio posts made with Murf voices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {demoClips.map((clip, index) => (
            <div 
              key={clip.id}
              className={`bg-white rounded-2xl p-6 shadow-lg hover-lift animate-slide-up delay-${(index + 1) * 100}`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                  {clip.category}
                </span>
                <span className="text-sm text-gray-500">{clip.duration}</span>
              </div>

              {/* Title */}
              <h3 className="heading-medium text-gray-900 mb-2">
                {clip.title}
              </h3>
              
              {/* Voice Info */}
              <p className="body-small text-gray-600 mb-4">
                Voice: {clip.voice}
              </p>

              {/* Waveform Visualization */}
              <div className="flex items-center justify-center gap-1 mb-6 h-16">
                {clip.waveform.map((height, i) => (
                  <div 
                    key={i}
                    className={`rounded-full transition-colors duration-200 ${
                      currentPlaying === clip.id 
                        ? 'bg-gradient-to-t from-purple-500 to-pink-500' 
                        : 'bg-gray-300'
                    }`}
                    style={{
                      width: '3px',
                      height: `${height}px`
                    }}
                  ></div>
                ))}
              </div>

              {/* Play Button */}
              <div className="flex items-center justify-center">
                <Button
                  onClick={() => handlePlayPause(clip.id)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
                    currentPlaying === clip.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                  }`}
                >
                  {currentPlaying === clip.id ? (
                    <Pause size={20} className="text-white" fill="white" />
                  ) : (
                    <Play size={20} className="text-white" fill="white" />
                  )}
                </Button>
              </div>

              {/* Mock Interaction Stats */}
              <div className="flex items-center justify-center gap-6 mt-4 text-gray-500">
                <span className="text-sm">❤️ {Math.floor(Math.random() * 1000) + 100}</span>
                <span className="text-sm">🔄 {Math.floor(Math.random() * 100) + 20}</span>
                <span className="text-sm">📤 {Math.floor(Math.random() * 50) + 10}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};