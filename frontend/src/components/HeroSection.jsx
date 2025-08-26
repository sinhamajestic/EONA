import React from 'react';
import { Button } from './ui/button';
import { Play, Volume2 } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="gradient-hero min-h-screen">
      <div className="gradient-overlay">
        <div className="container min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-6">
                <h1 className="display-hero text-gray-900">
                  🎙️ SnapCast
                </h1>
                <h2 className="heading-large text-gray-700">
                  The TikTok for Audio — Powered by Murf Voices
                </h2>
                <p className="body-large text-gray-600 max-w-lg">
                  Create, remix, and share snackable voice clips in seconds. 
                  AI-powered voices bring your thoughts to life instantly.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-primary hover-scale">
                  Start Creating
                </Button>
                <Button variant="outline" className="btn-secondary hover-lift">
                  Explore Feed
                </Button>
              </div>
            </div>

            {/* Right Content - Mock Video Player */}
            <div className="animate-slide-up delay-200 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Mock Mobile Frame */}
                <div className="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="bg-white rounded-[2rem] overflow-hidden" style={{width: '280px', height: '480px'}}>
                    {/* Mock Feed Interface */}
                    <div className="h-full bg-gradient-to-br from-purple-50 to-pink-50 relative">
                      {/* Header */}
                      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm">
                        <h3 className="font-semibold text-gray-900">SnapCast</h3>
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      </div>
                      
                      {/* Mock Audio Post */}
                      <div className="absolute inset-x-4 top-20 bottom-20 bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                          <div>
                            <p className="font-medium text-gray-900">@creator_voice</p>
                            <p className="text-sm text-gray-500">2 hours ago</p>
                          </div>
                        </div>
                        
                        <h4 className="font-semibold text-gray-900 mb-2">Motivation Monday</h4>
                        <p className="text-gray-600 text-sm mb-4">
                          "Success is not final, failure is not fatal..."
                        </p>
                        
                        {/* Mock Waveform */}
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(20)].map((_, i) => (
                            <div 
                              key={i} 
                              className="bg-gradient-to-t from-purple-500 to-pink-500 rounded-full"
                              style={{
                                width: '3px',
                                height: `${Math.random() * 24 + 8}px`
                              }}
                            ></div>
                          ))}
                        </div>
                        
                        {/* Play Button */}
                        <div className="flex items-center justify-center mb-4">
                          <button className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover-scale">
                            <Play size={24} fill="white" />
                          </button>
                        </div>
                        
                        {/* Bottom Actions */}
                        <div className="flex items-center justify-between text-gray-500">
                          <span className="text-sm">20s</span>
                          <div className="flex items-center gap-4">
                            <span className="text-sm">❤️ 1.2k</span>
                            <span className="text-sm">🔄 234</span>
                            <span className="text-sm">📤 89</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom indicator */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};