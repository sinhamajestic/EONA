import React from 'react';
import { Mic, Shuffle, TrendingUp } from 'lucide-react';

export const FeatureGrid = () => {
  const features = [
    {
      icon: <Mic className="w-8 h-8 text-purple-600" />,
      title: "Instant Murf Voices",
      text: "Turn your text into engaging short-form audio using realistic AI voices."
    },
    {
      icon: <Shuffle className="w-8 h-8 text-pink-600" />,
      title: "Remix in Seconds", 
      text: "Pick a new voice, change emotion, and publish remixes with one click."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Built for Virality",
      text: "Scroll, like, and share SnapCasts in a feed designed for discovery."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="heading-large text-gray-900 mb-4">
            Why SnapCast?
          </h2>
          <p className="body-large text-gray-600 max-w-2xl mx-auto">
            The first platform built specifically for short-form audio content creation and discovery.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-lg hover-lift animate-slide-up delay-${(index + 1) * 100}`}
              style={{border: '1px solid var(--border-light)'}}
            >
              <div className="mb-6">
                {feature.icon}
              </div>
              <h3 className="heading-medium text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="body-standard text-gray-600">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};