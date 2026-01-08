import React from 'react'

const Language = () => {
  return (
    <div className='w-full h-24 flex items-center justify-around border-t border-b border-primary/40 my-10'>
        <div className='text-md text-muted-foreground max-w-xs'>
            Supports multiple languages with different voice tones and accents
        </div>
        <div className='flex gap-6 text-2xl font-medium font-cal'>
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
