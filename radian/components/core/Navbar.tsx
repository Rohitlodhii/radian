import Image from 'next/image'
import React from 'react'
import ModeToggle from '../mode-toggle'
import { Button } from '../ui/button'
import { ArrowDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const router = useRouter();
  return (
    <div className='h-16 flex items-center justify-between w-full border-b border-primary/40 px-4'>
        <div className='flex items-center justify-center gap-2'>
            <Image src={'/logo.ico'} alt='logo' height={40} width={40} className='invert-100 dark:invert-0 rounded-md' />
           <h1 className='font-bold font-cal text-3xl'>Radian</h1>
           
        </div>
        <div className='flex items-center gap-2'>
            <ModeToggle/>
            <Button onClick={()=>router.push('https://github.com/Rohitlodhii/radian/releases/tag/Updatev2')} className='rounded-xl flex items-center gap-2 justify-center'>
                <ArrowDown/><span>Download</span>
            </Button>
        </div>
    </div>
  )
}

export default Navbar
