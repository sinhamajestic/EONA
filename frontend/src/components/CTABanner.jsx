import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CTABanner = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto animate-slide-up">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-8 h-8 text-yellow-300" />
            <h2 className="display-hero text-white">
              Your Voice. Amplified by AI.
            </h2>
            <Sparkles className="w-8 h-8 text-yellow-300" />
          </div>
          
          <p className="body-large text-white/90 mb-8 max-w-2xl mx-auto">
            Join the new wave of creators making viral audio with SnapCast. 
            Transform your ideas into engaging voice content in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className="bg-white text-purple-600 hover:bg-gray-100 btn-primary font-semibold px-8 py-4 text-lg hover-scale"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <p className="text-white/70 text-sm">
              No credit card required • Join 10k+ creators
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};