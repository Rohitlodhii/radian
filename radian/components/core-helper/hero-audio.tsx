"use client";

import React from 'react';
import { Audio, useVisualizerFrame } from '@sina_byn/re-audio';
import Image from 'next/image';
import { Play, Pause } from 'lucide-react';


const Visualizer = () => {
  const frame = useVisualizerFrame(16);

  return (
    <div className='flex justify-center gap-x-1'>
      <div className='flex flex-row-reverse items-end justify-center gap-x-1 h-28 overflow-x-hidden'>
        {frame.map((f, index) => (
          <div
            key={index}
            style={{ height: `${(f / 255) * 100}%` }}
            className='w-1.5 min-h-2.5 bg-primary/50 rounded-t-full'
          />
        ))}
      </div>
      <div className='flex items-end justify-center gap-x-1 h-28 overflow-x-hidden'>
        {frame.map((f, index) => (
          <div
            key={index}
            style={{ height: `${(f / 255) * 100}%` }}
            className='w-1.5 min-h-2.5 bg-primary/50 rounded-t-full'
          />
        ))}
      </div>
    </div>
  );
};

interface HeroCardProps {
  image: string;
  voice: string;
  name: string;
  autoplay?: boolean;
  autoplayKey?: number;
}

const HeroCard = ({ image, voice, name, autoplay = false, autoplayKey = 0 }: HeroCardProps) => {
  const togglePlayRef = React.useRef<(() => void) | null>(null);
  const lastAutoplayKeyRef = React.useRef(0);

  React.useEffect(() => {
    // Trigger autoplay when autoplayKey changes (button clicked)
    if (autoplay && autoplayKey > 0 && autoplayKey !== lastAutoplayKeyRef.current && togglePlayRef.current) {
      lastAutoplayKeyRef.current = autoplayKey;
      // Small delay to ensure audio is ready
      const timer = setTimeout(() => {
        togglePlayRef.current?.();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [autoplay, autoplayKey]);

  return (
    <Audio
      key={voice}
      playlist={[
        { id: 1, src: voice, name: `${name} Voice` },
      ]}
    >
      {({
        loading,
        trackIndex,
        playlist,
        playing,
        togglePlay,
      }) => {
        // Store togglePlay function in ref
        React.useEffect(() => {
          togglePlayRef.current = togglePlay;
        }, [togglePlay]);

        return (
          <div className='w-80 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 overflow-hidden relative flex flex-col items-center justify-center gap-6 rounded-lg border border-border bg-card'>
            {/* Avatar Image */}
            <div className=' w-full h-full flex items-center justify-center   overflow-hidden'>
              <Image
                src={image}
                alt={`${name} Avatar`}
              
                height={100}
                width={300}
                className='object-cover hidden md:block dark:grayscale-100'
              />
              <Image
                src={image}
                alt={`${name} Avatar`}
              
                height={70}
                width={150}
                className='object-cover md:hidden dark:grayscale-100'
              />
            </div>

            {/* Play/Pause Button */}
            <button
              type='button'
              onClick={togglePlay}
              disabled={loading}
              className='flex absolute items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {loading ? (
                <div className='w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin' />
              ) : playing ? (
                <Pause className='w-6 h-6' fill='currentColor' />
              ) : (
                <Play className='w-6 h-6 ml-1' fill='currentColor' />
              )}
            </button>

         
          </div>
        );
      }}
    </Audio>
  );
};

export default HeroCard
