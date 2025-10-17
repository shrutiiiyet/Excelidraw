import React from 'react';
import HeroSection from './hero-section';
import FeaturesSection from './FeaturesSection';

const Landing = () => {
  return (
    <main className='text-secondary flex flex-col items-center justify-center'>
      <HeroSection />
      <FeaturesSection />
    </main>
  );
};

export default Landing;