"use client";
import React from 'react'
import Link from 'next/link'
import { Button as AuthButton } from "../auth/Button";
import { SessionProvider } from 'next-auth/react';

type Props = {}

const Header = (props: Props) => {
  return (
    <SessionProvider>
      <div className='flex justify-between mx-5'>
        <Link href="/" className="text-4xl text-[#8f8952] mx-2 my-4 italic">ByteBlog</Link>
        <AuthButton />
      </div>
    </SessionProvider>
  )
}

export default Header