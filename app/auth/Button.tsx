"use client";
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
// import { GiHamburgerMenu } from "react-icons/gi";

type Props = {}

export const Button = (props: Props) => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (session) {
    return (
      <div className='flex items-stretch'>
        <Link href="/" className='mr-6 hover:text-[#5673da] self-center text-[#0f277b] font-bold'>Home</Link>
        <Link href="/blog/all" className='mr-6 hover:text-[#5673da] self-center text-[#0f277b] font-bold'>Browse All</Link>
        <Link href="/blog/new" className='mr-6 hover:text-[#5673da] self-center text-[#0f277b] font-bold'> Write a Post</Link>
        <button className="text-[#0f277b] border-2 border-[#0f277b] hover:text-[#5673da] hover:border-[#5673da] px-5 my-5 rounded-full cursor-pointer" onClick={(e) => {
          e.preventDefault()
          signOut()
        }}>Sign Out</button>
      </div>
    )
  }
  return (
    <div className='flex items-stretch'>
     <Link href="/" className='mr-6 hover:text-[#708ae7] self-center text-[#0f277b] font-bold'>Home</Link>
     <Link href="/blog/all" className='mr-6 hover:text-[#5673da] self-center text-[#0f277b] font-bold'>Browse All</Link>
      <button onClick={() => signIn()} className="text-[#0f277b] border-2 border-[#0f277b] hover:text-[#5673da] hover:border-[#5673da] px-5 my-5 rounded-full cursor-pointer">
      Sign In</button>

    </div>
   

  )
}



