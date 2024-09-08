import React from 'react'
import { PrismaClient } from '@prisma/client'
import PostCard from './PostCard'

const prisma = new PrismaClient()

type Props = {}

const Posts = async (props: Props) => {
  const posts = await prisma.post.findMany({
    take: 3,
    orderBy: {
      createdAt: 'desc'
    },
  },
  )


  return (
    <div className='w-11/12 mx-auto'>
      <h2 className='text-[#8f8952] font-bold sm:text-6xl text-4xl text-center mt-6'>Trending</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-4'>
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post}/>
        ))}
      </div>
    </div>
  )
}

export default Posts;