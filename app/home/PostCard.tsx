"use client";
import React from 'react'
import type { Post } from '@prisma/client';
import Link from 'next/link';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify'

type Props = {
  post: Post,
}

const PostCard = ({post}: Props) => {
  return (
    <Link href={`/blog/${post.id}`} className='p-8 rounded-md border-2 border-[#8f8952] line-clamp-6'>
      <h3 className='text-[#8f8952] text-2xl sm:text-3xl mb-3 font-bold'>{post.title}</h3>
      <p className='text-zinc-700 line-clamp-6'>{parse(DOMPurify.sanitize(post.content || ''))}</p>
    </Link>
   
  )
}

export default PostCard


