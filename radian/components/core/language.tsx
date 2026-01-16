import React from 'react'

const Language = () => {
  return (
    <div className='w-full hidden h-24 md:flex flex-col md:flex-row items-center justify-around border-t border-b border-primary/40'>
        <div className='text-center md:text-left md:text-md text-muted-foreground md:max-w-xs'>
            Supports multiple languages with different voice tones and accents
        </div>
        <div className='flex gap-6 text-lg md:text-2xl font-medium font-cal'>
            <span>English</span>
            <span>हिन्दी</span>
            <span>italiana</span>
            <span>日本語</span>
            <span>français</span>
        </div>
    </div>
  )
}

export default Language
