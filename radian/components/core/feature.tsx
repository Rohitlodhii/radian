"use client";

import React, { useState } from 'react'
import HeroCard from '../core-helper/hero-audio'
import { Button } from '@/components/ui/button'


const voices = [
  {
    name : "Heart",
    language : "EN",
    image:"/avatars/heart.png",
    voice :"/voices/heart-en.wav"
  },
  {
    name : "Bella",
    language : "EN",
    image:"/avatars/bella.png",
    voice :"/voices/bella-en.wav"
  },
  {
    name : "Adam",
    language : "EN",
    image:"/avatars/santigo.png",
    voice :"/voices/adam-en.wav"
  },
  {
    name : "Micheal",
    language : "EN",
    image:"/avatars/samuel.png",
    voice :"/voices/micheal-en.wav"
  },
  {
    name : "Arohi",
    language : "Hi",
    image:"/avatars/arohi.png",
    voice :"/voices/beta-hi.wav"
  },
  {
    name : "Rohan",
    language : "Hi",
    image:"/avatars/rohan.png",
    voice :"/voices/psi-hi.wav"
  },
  {
    name : "Nicola",
    language : "It",
    image:"/avatars/samuel.png",
    voice :"/voices/italian-sara.wav"
  },
  {
    name : "Elorie",
    language : "Fr",
    image:"/avatars/elode.png",
    voice :"/voices/french-sw.wav"
  },
  {
    name : "Santigo",
    language : "Spn",
    image:"/avatars/santigo.png",
    voice :"/voices/santa-spn.wav"
  },
  {
    name : "Alexendre",
    language : "Por",
    image:"/avatars/alexandre.png",
    voice :"/voices/alex-por.wav"
  },

]

const Features = () => {
  const [selectedVoice, setSelectedVoice] = useState(voices[0]);
  const [autoplayKey, setAutoplayKey] = useState(0);

  const handleVoiceSelect = (voice: typeof voices[0]) => {
    setSelectedVoice(voice);
    // Increment key to trigger autoplay
    setAutoplayKey(prev => prev + 1);
  };

  return (
    <div className="mx-auto border-t border-primary/30 md:border-0 max-w-7xl w-full mt-10 flex justify-center h-full py-10 px-4 sm:px-6">
      <div className='p-4 sm:p-8 w-full grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8'>
        <div className='flex flex-col gap-4 items-start justify-center'>
          <div className='border-border rounded-xl bg-secondary shadow-sm px-4 text-sm py-1 max-w-fit flex gap-2 items-center'>Voices</div>
          <div className='text-3xl sm:text-4xl md:text-5xl font-medium font-cal'>Comes with a variety of AI voices in each language</div>
          <div className='max-w-xl text-muted-foreground text-base sm:text-lg md:text-xl'>Radian consist of different male and female voices with different accents , so you can pick best for your work</div>
          
          {/* Voice Selection Buttons – visible on md+ (keep large/medium UI the same) */}
          <div className='hidden md:flex flex-wrap gap-2 mt-4'>
            {voices.map((voice) => (
              <Button
                key={voice.name}
                variant={selectedVoice.name === voice.name ? "default" : "outline"}
                size="sm"
                onClick={() => handleVoiceSelect(voice)}
                className='text-sm'
              >
                {voice.name} <span className='text-muted-foreground'>[{voice.language}]</span>
              </Button>
            ))}
          </div>
        </div>
        <div className='flex items-center justify-center md:justify-end w-full'>
          <div className='w-full max-w-sm sm:max-w-md md:max-w-none flex flex-col md:items-end gap-4'>
              <HeroCard
                image={selectedVoice.image}
                voice={selectedVoice.voice}
                name={selectedVoice.name}
                autoplay={autoplayKey > 0}
                autoplayKey={autoplayKey}
              />

              {/* Voice Selection Buttons – visible on small screens below the HeroCard */}
              <div className='flex md:hidden flex-wrap justify-start gap-2 mt-2'>
                {voices.map((voice) => (
                  <Button
                    key={voice.name}
                    variant={selectedVoice.name === voice.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleVoiceSelect(voice)}
                    className='text-sm'
                  >
                    {voice.name} <span className='text-muted-foreground'>[{voice.language}]</span>
                  </Button>
                ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features
