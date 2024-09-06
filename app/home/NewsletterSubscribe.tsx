"use client";
import React, { useState } from 'react'

type Props = {}

const NewsletterSubscribe = (props: Props) => {
  const [subscribed, setSubscribed] = useState<boolean>(false);

  async function create(formData: FormData) {
    const email = formData.get('email');
    await fetch('/api/beehiiv', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if (data) {
          setSubscribed(true);
        }
      }).catch(err => console.log(err));
  }

  if (subscribed) return (
    <div className='flex flex-col mt-4 text-[#0f277b]'>
      <h2 className='text-2xl'>Thank you for subscribing!</h2>
      <p>You&apos;ll receive the latest tech news and announcements in your inbox.</p>
    </div>
  )

  return (
    <form action={create} id='newsletter'>
      <div className='flex flex-col gap-5'>
        <input type="email" name="email" id="email" placeholder='Enter your email' className='border-2 border-[#0f277b] rounded-md py-3 px-4 text-zinc-700  placeholder-zinc-500' />
        <button className='w-1/2 bg-[#0f277b] border-none rounded-md py-3 px-4 text-white font-semibold uppercase'>Subscribe</button>
      </div>
    </form>
  )
}

export default NewsletterSubscribe