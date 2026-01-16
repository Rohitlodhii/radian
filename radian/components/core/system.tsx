import React from 'react'
import HeroCard from '../core-helper/hero-audio'
import { Button } from '../ui/button'
import { CloudOff, DatabaseIcon, DollarSignIcon, Gauge, Gpu } from 'lucide-react'
import Image from 'next/image'

const System = () => {
  return (
    <div className='mt-10 px-4 border-t border-b border-primary/40 h-full py-10'>
      <div className="mx-auto max-w-7xl w-full flex justify-center h-full flex-col px-4 sm:px-6 lg:px-8">
            <div className='py-8 w-full flex flex-col gap-8'>
                <div className='flex flex-col gap-4 items-start justify-center'>
                <div className='border-border rounded-xl bg-secondary shadow-sm px-4 text-sm py-1 max-w-fit flex gap-2 items-center'>Model</div>
                <div className='text-3xl md:text-5xl font-medium font-cal'>Powered by kokoro-82M tts model</div>
                <div className='max-w-xl text-muted-foreground text-base sm:text-lg md:text-xl'>built on kokoro tts which delivers comparable quality to larger models while being significantly faster and more cost-efficient</div>
                <Button variant={"outline"}>Visit Kokoro</Button>
                </div>
                <div className='w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4'>
                        <div className='h-36 md:h-48 w-full bg-sidebar shadow-sm border border-border rounded-xl flex items-center justify-center flex-col gap-3 p-4'>
                            <div className='bg-background shadow-lg h-20 w-20 md:h-24 md:w-24 flex items-center justify-center rounded-lg'>
                                <Gpu className='size-8 md:size-12 '/>
                            </div>
                            <h1 className='font-cal  text-xs md:text-sm text-center'>No GPU required</h1>
                        </div>
                        <div className='h-36 md:h-48 w-full bg-sidebar shadow-sm border border-border rounded-xl flex items-center justify-center flex-col gap-3 p-4'>
                            <div className='bg-background shadow-lg h-20 w-20 md:h-24 md:w-24 flex items-center justify-center rounded-lg'>
                                <CloudOff className='size-8 md:size-12'/>
                            </div>
                            <h1 className='font-cal text-xs md:text-sm  text-center'>Works Offline</h1>
                        </div>
                        <div className='h-36 md:h-48 w-full bg-sidebar shadow-sm border border-border rounded-xl flex items-center justify-center flex-col gap-3 p-4'>
                            <div className='bg-background shadow-lg h-20 w-20 md:h-24 md:w-24 flex items-center justify-center rounded-lg'>
                                <Gauge className='size-8 md:size-12'/>
                            </div>
                            <h1 className='font-cal text-xs md:text-sm  text-center'> Works Faster </h1>
                        </div>
                        <div className='h-36 md:h-48 w-full bg-sidebar shadow-sm border border-border rounded-xl flex items-center justify-center flex-col gap-3 p-4'>
                            <div className='bg-background shadow-lg h-20 w-20 md:h-24 md:w-24 flex items-center justify-center rounded-lg'>
                                <DatabaseIcon className='size-8 md:size-12'/>
                            </div>
                            <h1 className='font-cal text-xs md:text-sm  text-center'>Takes low memory</h1>
                        </div>
                        <div className='h-48 hidden  w-full bg-sidebar shadow-sm border border-border rounded-xl md:flex items-center justify-center flex-col gap-3 p-4'>
                            <div className='bg-background shadow-lg h-24 w-24 flex items-center justify-center rounded-lg'>
                                <DollarSignIcon className='size-12'/>
                            </div>
                            <h1 className='font-cal text-sm text-center'>Zero Cost</h1>
                        </div>
                </div>
        </div>
      </div>
    </div>
  )
}

export default System
