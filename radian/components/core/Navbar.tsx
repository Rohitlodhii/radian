import Image from 'next/image'
import React from 'react'
import ModeToggle from '../mode-toggle'
import { Button } from '../ui/button'
import { User2 } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='h-16 flex items-center justify-between w-full border-b border-primary/40 px-4'>
        <div className='flex items-center justify-center gap-2'>
            <Image src={'/logo.png'} alt='logo' height={30} width={30} className='invert-100 dark:invert-0 rounded-md' />
           <h1 className='font-bold font-cal text-3xl'>Radian</h1>
           
        </div>
        <div className='flex items-center gap-2'>
            <ModeToggle/>
            <Button className='rounded-xl flex items-center gap-2 justify-center'>
                <User2/><span>Sign in</span>
            </Button>
        </div>
    </div>
  )
}

export default Navbar
