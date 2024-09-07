"use client";
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link';

type Props = {}

export const Button = (props: Props) => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (session) {
    return (
      <div className='flex items-stretch'>
        <Link href="/blog/new" className='mr-6 hover:underline self-center text-[#0f277b] font-bold'>✍️ Write a Post</Link>
        <button className="text-[#0f277b] border-2 border-[#0f277b] px-5 my-5 rounded-full cursor-pointer" onClick={(e) => {
          e.preventDefault()
          signOut()
        }}>Sign Out</button>
      </div>
    )
  }
  return (
    <div onClick={() => signIn()} className="text-[#0f277b] border-2 border-[#0f277b] px-5 my-5 rounded-full cursor-pointer">
      
      Sign In</div>
  )
}