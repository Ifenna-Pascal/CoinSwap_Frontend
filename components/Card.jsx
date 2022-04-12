import Image from 'next/image'
import React from 'react'

function Card({img, header, content}) {
  return (
    <div className='px-5 py-6 rounded-2xl bg-gray-400 bg-clip-padding bg-opacity-10 border-[2px] border-slate-800 flex flex-col space-y-2 items-start justify-start z-10 backdrop-filter border-opacity-5 backdrop-blur-sm z-2  '>
        <Image
            src={img}
            alt="Logo"
            width={30}
            height= {30}
        />
        <span className='text-white text-xl lg:text-2xl text-left font-semibold'>{header}</span>
        <span className='text-left text-gray-500 font-semibold text-base lg:text-lg'>{content}</span>
    </div>
  )
}

export default Card