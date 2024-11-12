import React from 'react';
import { Input } from './ui/input';

export default function HeroSection() {
  return (
    <div className="m-2 px-4 h-[90vh] py-6  mx-4 bg-transparent ">
      <div className="border-gray-300 flex justify-between rounded-lg shadow-lg h-full overflow-hidden " >
        
        {/* Left Image at Edge */}
        <div className="flex-shrink-0 w-fit mx-2 h-full flex justify-start items-center">
          <img
            src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/f_auto,q_auto/brontes/uma-hero/image-left.png"
            alt="left-Hero"
            className="h-full object-contain"
          />
        </div>

        {/* Center Text */}
        <div className="text-center px-4 md:px-6 pt-8 flex-grow flex flex-col justify-center">
          <p className="font-bold text-5xl md:text-5xl font-cg mb-6">
            We <span className="text-bright-turquoise-600">connect</span> People to bring projects to <span className="text-electric-lime-600">life</span>
          </p>
          
          <div className="w-full flex justify-end  mb-3">
            <div className="bg-white shadow-md border mr-20 border-gray-300 p-4 backdrop-blur-lg bg-opacity-80 rounded-lg max-w-sm">
              <p className="text-sm text-right font-light">
                Find high-quality talent or open jobs with the help of AI tools that keep you in control.
              </p>
            </div>
          </div>
          <div className='h-1 px-3 flex mr-20 justify-end mb-3'>
            <div className='bg-white border-gray-300 mx-3 border px-1 shadow-md  h-2   backdrop-blur-lg bg-opacity-80 rounded-lg w-20 '></div>
            <div className='bg-white border-gray-300 mr-7 border px-1 shadow-md  h-2   backdrop-blur-lg bg-opacity-80 rounded-lg w-12 '></div>

          </div>
              
          {/* Input Field with Inner Shadow */}
          <div className="flex justify-center">
  <div className="relative w-full max-w-[550px]">
    <Input
      className="w-full px-4 py-2 ring-2 ring-electric-lime-500 rounded-lg shadow-inner shadow-[inset_0_0_8px_rgba(144,238,144,0.4)] focus:outline-none focus:ring-electric-lime-400 placeholder-gray-500 text-base"
      placeholder="Search anything..."
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z"
      />
    </svg>
  </div>
</div>

        </div>

        {/* Right Image at Edge */}
        <div className="flex-shrink-0 w-fit h-full flex mx-2 justify-end items-center">
          <img
            src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/f_auto,q_auto/brontes/uma-hero/image-right.png"
            alt="right-Hero"
            className="h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
