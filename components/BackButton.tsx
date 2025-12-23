import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const BackButton = () => {
  return (
    <div className='fixed top-8 right-10 z-100 '>
      <Link href='/' className='flex items-center justify-center bg-teal-600 rounded-full py-2 text-sm text-white px-4 cursor-pointer
      hover:scale-101 active:scale-96 transition-all duration-200'>Go Back <ArrowRight className='w-4 h-4 mx-1'/> </Link>

    </div>
  )
}


export const BackEdit = () => {
  return (
    <div className='fixed top-8 right-10 z-100 '>
      <Link href='/inventory' className='flex items-center justify-center bg-teal-600 rounded-full py-2 text-sm text-white px-4 cursor-pointer
      hover:scale-101 active:scale-96 transition-all duration-200'>Inventory <ArrowRight className='w-4 h-4 mx-1'/> </Link>

    </div>
  )
}

