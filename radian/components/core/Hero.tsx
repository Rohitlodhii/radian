import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight, ChevronRight, User2 } from 'lucide-react'
import Image from 'next/image'
import { Ripple } from '../ui/ripple'
import { LightRays } from '../ui/light-rays'
import { BackgroundRippleEffect } from '../ui/background-ripple-effect'

const Hero = () => {
  return (
    <div className='h-[75vh] flex w-full relative items-center justify-center px-10'>
             <BackgroundRippleEffect />
        <div className='flex flex-col  gap-6 items-center text-center z-10'>
        <div className='border-border rounded-xl bg-secondary shadow-sm px-4 text-sm py-1 max-w-fit flex gap-2 items-center'>with 🎉BuiltnBuild <ChevronRight className='h-4 w-4 -translate-y-[1px]'/></div>
      <div className='flex flex-col  gap-4 max-w-2xl'>
        <h1 className='text-6xl  font-cal '>Unlimited studio-quality <span className='text-blue-900'> AI Voices</span> , free and local </h1>
        <p className='text-lg text-muted-foreground font-medium tracking-tight'>A powerful local text-to-speech engine delivering unlimited AI voices at zero cost.
        Built to run efficiently on everyday computers — no GPU required, no cloud required, no restrictions with multiple languages.</p>
      </div>
      <div className='flex flex-col '>
        <Button className='h-12 max-w-fit cursor-pointer'>
            <span>Download for Windows</span>
            <Image src={'/winicon.png'} alt='windows' className='invert-100 dark:invert-0' width={20} height={20}/></Button>
      </div>
      </div>
    </div>
  )
}

export default Hero
