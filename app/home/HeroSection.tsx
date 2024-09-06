import React from 'react'
import Link from 'next/link';


type Props = {}

const HeroSection = (props: Props) => {
  return (
    <div className="py-20 flex flex-col text-center items-center justify-center ">
        <div className=' text-[#8f8952]'>
          <h1 className='text-2xl font-bold sm:text-4xl md:text-6xl leading-none tracking-tighter'>
            Stay Ahead in Tech
          </h1>
          <h2 className='my-2 text-2xl sm:text-3xl md:text-4xl leading-none tracking-tight'>
            Explore Insights, Innovations, and Industry Trends
          </h2>
          <p  className='my-2 mx-auto w-1/2 '>
            Discover your go-to platform for in-depth articles and comprehensive industry news. Stay informed with the latest product launches and explore cutting-edge technology insights. Dive into a world of innovation and expertise with every visit.
          </p>
        </div>
        
          <div className="flex flex-row gap-3 items-center">
            <Link href="/blog/all" className='text-white block w-fit bg-[#0f277b] border-none px-4 py-2 sm:px-6 sm:py-4 mt-3 border-2 rounded-full '>Browse Articles</Link>
            <Link href="#newsletter" className='text-[#0f277b] block w-fit border-2 border-[#0f277b] px-4 py-2 sm:px-6 sm:py-4 mt-3 rounded-full '>Subscribe to our newsletter</Link>
          </div>
          
        
    </div>
  )
}

export default HeroSection