import { SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { FilePlus2 } from 'lucide-react'
import { ModeToggle } from './mode'

const Header = () => {
  return (
    <div className='flex justify-between bg-white shadow-sm p-5 border-b'>
        <Link 
        href='/dashboard'
        className='text-2xl'
        >
            Chat to <span className='text-indigo-600'>PDF</span> 
        </Link>
        <SignedIn>
            {/* <ModeToggle/> */}
            <div className='flex items-center space-x-2'>
                {/* Upgrade Button */}
                <Button asChild variant='secondary' className='hidden md:flex '>
                    <Link
                    href='/dashboard/upgrade'>Pricing</Link>
                </Button>
                {/* Documents button */}
                <Button asChild variant='outline' className='hidden md:flex '>
                    <Link
                    href='/dashboard/'>My Documents</Link>
                </Button>
                {/* Add documents */}
                <Button asChild variant='outline' className='hidden md:flex '>
                    <Link
                    href='/dashboard/upload'><FilePlus2 className='text-indigo-600' /></Link>
                </Button>
                <UserButton />
            </div>
        </SignedIn>
    </div>
  )
}

export default Header