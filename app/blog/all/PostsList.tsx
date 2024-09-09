import React from 'react';
import { Prisma } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser';

type Post = Prisma.PostGetPayload<{
  include: { categories: true };
}>;

export type PostListProps = {
  posts: Post[];
};

export const PostsList = (props: PostListProps) => {
  return (
    <div className='w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
      {props.posts.map((post: Post) => (
        <div key={post.id} className='flex flex-col border border-[#8f8952] rounded-md bg-white p-4 shadow-md transition-transform transform hover:scale-105'>
          <Link href={`/blog/${post.id}`} className='flex flex-col h-full'>
            <h1 className='text-2xl font-bold text-[#8f8952] mb-2 '>{post.title}</h1>
            <p className='text-sm text-zinc-700 mb-4'>{post.createdAt?.toLocaleString()}</p>
            <figure className='w-full mb-4'>
              {
                post.imgURL ? 
                <Image
                  src={post.imgURL} 
                  alt="thumbnail" 
                  width={500}         
                  height={192}
                  className='object-cover rounded-md' 
                  loading="lazy"
                /> : 
                <Image
                  src="/article-placeholder.png" 
                  alt="thumbnail" 
                  width={500}         
                  height={192}
                  className='object-cover rounded-md' 
                  loading="lazy"
                />
              }
            </figure>
            <p className='text-base mb-4 line-clamp-4'>
              {parse(post.content || '')}
              {/* {parse(DOMPurify.sanitize(post.content || ''))} */}
            </p>
            <p className='text-[#0f277b] cursor-pointer'>Read More</p>
          </Link>
        </div>
      ))}
    </div>
  );
};
