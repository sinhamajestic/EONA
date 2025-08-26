import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { FeatureGrid } from '../components/FeatureGrid';
import { DemoCarousel } from '../components/DemoCarousel';
import { CTABanner } from '../components/CTABanner';

export const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <FeatureGrid />
      <DemoCarousel />
      <CTABanner />
    </div>
  );
};