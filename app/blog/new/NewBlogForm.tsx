"use client";
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { createPost } from "@/app/actions/publishPost";
import Link from 'next/link';
import type { Category } from '@prisma/client';
import CategoryDropdown from './CategoryDropdown';
import { Prisma } from '@prisma/client';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type Props = {
  blogCategories: Category[]
}

import "@uploadthing/react/styles.css";
import { UploadButton } from "../../utils/uploadthing";

const NewBlogForm = (props: Props) => {
  const { data: session, status } = useSession();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [postID, setPostID] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!session && status !== "loading") return (
    <div>You must be signed in to post</div>
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = session?.user as any;
    const userId = user?.id;

    if (!userId) return;
    try {
      let newPost: Prisma.PostUncheckedCreateInput = { title, content, authorId: userId, imgURL: thumbnail };

      if (categoryId) {
        newPost.categories = {
          connect: [{ id: categoryId }]
        };
      }
      const post = await createPost(newPost);
      setPostID(post.id);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (submitted) return (
    <div className='py-2 container flex flex-col mt-12'>
      <div className='flex flex-col flex-1 items-stretch justify-center h-full text-left border border-[#8f8952] p-8'>
        <h1 className='text-4xl font-bold text-[#8f8952]'>Your post has been published:</h1>
        <Link href={`/blog/${postID}`} className='text-[#0f277b] text-xl mt-4'>Click here to view</Link>
      </div>
    </div>
  );

  return (
    <div className='min-h-[calc(100vh-130px)] py-2 container flex flex-col mt-12'>
      <form className='flex flex-col items-stretch justify-center h-full text-left' onSubmit={handleSubmit}>
        <input 
          type="text" 
          className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 focus-visible:outline-none p-2 border-b-2' 
          placeholder='Title' 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          name="title" 
        />

        <div className='mb-12 mt-6'>
          <ReactQuill 
            value={content} 
            onChange={(value) => setContent(value)} 
            className='focus-visible:outline-none h-96 text-lg'
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline', 'blockquote'],
                [{ 'align': [] }],
                ['link', 'image'],
                ['clean']                                        
              ],
            }}
            formats={[
              'header', 'font', 'size',
              'bold', 'italic', 'underline', 'strike', 'blockquote',
              'list', 'bullet', 'indent',
              'link', 'image', 'align'
            ]}
          />
        </div>

        <div className="self-start mt-4">
          {thumbnail && <img src={thumbnail} alt="Thumbnail" className='w-24 h-24 object-cover rounded-full mb-3' />}
          <label className='block text-slate-600 mt-6 mb-2'>{thumbnail ? "Change Image" : "Add thumbnail image (optional)"}</label>
          <UploadButton
            className='items-start'
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res) {
                setThumbnail(res[0].url);
              }
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          
          <CategoryDropdown list={props.blogCategories} selected={categoryId} setSelected={(selected: number) => setCategoryId(selected)} />
        </div>

        <button type="submit" className='w-fit-content text-white bg-[#0f277b] px-4 py-2 sm:px-6 sm:py-4 mt-6 border-2 rounded-lg'>
          Create
        </button>
      </form>

    </div>
  );
}

export default NewBlogForm;
