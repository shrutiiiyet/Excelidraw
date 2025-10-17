import { knewave } from '@/data/fonts';
import siteMetadata from '@/lib/siteMetadata';
import React from 'react';
import Animation from '@/components/animation';

const HeroSection = () => {
  return (
    <section className='bg-background_yellow mt-18 flex w-screen flex-col items-center justify-center py-24 text-center md:mb-10 md:py-56'>
      {/* Headline */}
      <h1 className='flex flex-col items-center justify-between gap-4 text-center text-5xl font-semibold tracking-wide md:gap-2 md:text-6xl lg:flex-row xl:text-7xl'>
        <span>Online </span>
        <span className={`${knewave.className} font-light`}>
          <Animation>Whiteboard</Animation>
        </span>
        <span>Made Simple </span>
      </h1>

      {/* Subheading */}
      <p className='mt-6 text-center text-lg text-gray-700 md:text-xl'>
        {siteMetadata.slogan} with{' '}
        <span className='font-bold'>{siteMetadata.header}</span>.
      </p>

      {/* Call-to-Action Buttons */}
      <div className='mt-8'>
        <a
          href='/dashboard'
          className='hover:bg-primary bg-primary-darker rounded-lg px-6 py-4 text-center font-bold tracking-wider text-white transition md:text-lg'
        >
          🎨 Start Drawing Now
        </a>
      </div>
    </section>
  );
};

export default HeroSection;