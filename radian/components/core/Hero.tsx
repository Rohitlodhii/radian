'use client'

import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { BackgroundRippleEffect } from '../ui/background-ripple-effect'
import { DownloadDialog } from './download-dialog'
import VideoPlayer from './player'




const Hero = () => {
  return  (
    <div
      className="
        h-full flex flex-col gap-24 md:py-24 py-32 w-full
        relative overflow-hidden
        items-center justify-center md:px-10 px-2
        bg-[linear-gradient(to_bottom,#ffffff_0%,#e6d9ff_50%,#ffffff_100%)]
        dark:bg-[linear-gradient(to_bottom,#080808_0%,#1a1033_20%,#3a1b6f_50%,#1a1033_80%,#080808_100%)]
      "
    >
     
     <BackgroundRippleEffect/>
            
        <div className='flex flex-col  gap-6 items-center text-center z-10'>
        <div className='border-border rounded-xl bg-secondary shadow-sm px-4 text-sm py-1 max-w-fit flex gap-2 items-center'>coming soon for mac </div>
      <div className='flex flex-col  gap-4 md:max-w-2xl'>
        <h1 className='hidden md:block text-6xl text-center  font-cal '>Unlimited studio-quality <span className=''> AI Voices</span> , free and local </h1>
        <h1 className='text-3xl md:hidden md:text-6xl text-center  font-cal '>Unlimited studio-quality <br></br><span className=''> AI Voices</span> , free and local </h1>
        <p className='hidden md:block text-lg text-muted-foreground font-medium tracking-tight'>A powerful local text-to-speech engine delivering unlimited AI voices at zero cost.
        Built to run efficiently on everyday computers — no GPU required, no cloud required, no restrictions with multiple languages.</p>
        <p className='text-xs md:hidden max-w-xs md:text-lg text-muted-foreground font-medium tracking-tight'>A powerful local text-to-speech engine delivering unlimited AI voices at zero cost.
        Built to run efficiently on everyday computers — no GPU required</p>
      </div>
      <div className='flex flex-col '>
          <DownloadDialog>
            <Button className='h-12 max-w-fit cursor-pointer bg-black dark:bg-white'>
              <span>Download for Windows</span>
              <Image src={'/winicon.png'} alt='windows' className='invert-100 dark:invert-0' width={20} height={20}/>
            </Button>
          </DownloadDialog>
      </div>
    </div>
    <VideoPlayer/>
  </div>
  )
}

export default Hero
