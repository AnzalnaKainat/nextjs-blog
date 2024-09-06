import React from 'react'
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";

import Image from 'next/image'
import Link from 'next/link'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className='bg-[#8f8952] text-white py-12 px-4'><div className='flex container justify-between'>
      <div className='flex flex-row items-center'>
        <div>
          <div className='text-2xl mb-3'>Anzalna's Blog</div>
          <div className='text-sm'>© 2024 Anzalna's Blog</div>
        </div>
      </div>
      <div className='flex gap-3'>
        <a href='https://github.com' target="_blank">
        <IoLogoGithub className='w-10 h-10'/>
        </a>
        <a href='https://twitter.com' target="_blank">
        <IoLogoLinkedin className='w-10 h-10' />
        </a>
      </div>
    </div></div>
  )
}

export default Footer