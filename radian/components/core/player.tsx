import React from 'react'
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'

const VideoPlayer = () => {
  return (
    <div className='h-full w-full md:px-24 '>
      <HeroVideoDialog
        className="hidden dark:block w-full h-full"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/BZPP5uZf1Fc?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="/image.png"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className=" dark:hidden w-full h-full"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/BZPP5uZf1Fc?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="/heroimage.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  )
}

export default VideoPlayer