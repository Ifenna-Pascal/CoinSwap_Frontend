import Image from 'next/image'
import React from 'react'
import { Swaps } from '../util/Swap_list'

const Card = ({header, content}) => (
    <div className='md:px-8 px-5 py-5 md:py-8 rounded-2xl bg-gray-200 mt-5 lg:w-[23rem] bg-clip-padding bg-opacity-5 border-[2px] border-slate-800  flex flex-col justify-center z-10 mr-4 lg:mr-0 backdrop-filter border-opacity-5 backdrop-blur-sm '>
        <h1 className='text-white font-bold mb-4 text-3xl lg:text-5xl '>{header}</h1>
        <span className='text-gray-500 text-lg font-semibold '>{content}</span>
    </div>
)

function Swap() {
  return (
    <div className='bg-[#16161D]'>
        <div className='lg:max-w-[80%] mx-auto'>
            <div className='lg:py-16 items-center  justify-center flex flex-col space-y-6 lg:space-y-10'>
                <h1 className='font-bold text-3xl text-center lg:text-5xl text-white leading-10 tracking-wide font-Catamaran'>CoinSwap Space in numbers</h1>
                <span className='text-[#939197]  md:max-w-[95%] lg:max-w-[60%] mx-auto text-center text-base lg:text-xl font-semibold leading-8 tracking-wide'>
                CoinSwap Space is a decentralized exchange that provides users with a suite of services to help them maximize their returns in the DeFi space
                </span> 
            </div>
            <div className='grid lg:mt-8 w-[95%] md:w-[90%] mx-auto lg:w-full grid-cols-1 lg:grid-cols-2 lg:space-x-8'>
                
                 <div className='relative'>
                <div className='absolute hidden md:block top-[30%] left-[35%]'>
                <Image 
                    src="/img/coin_logo.png"
                    alt="Logo"
                    width={220}
                    height= {220}
                />
                </div>
                <div className='grid h-[60%] mt-12 lg:mt-20 grid-cols-2 '>

                    {
                        Swaps.map((x, i) => (
                            <Card header={x.header} content={x.content} key={i} />
                        ))
                    }
                </div>
                </div> 
                  <div className='flex md:items-center mt-12 lg:mt-0 lg:items-end  lg:w-[42rem] flex-col'>
                  <img
                        src="/img/coinswap_swap.png"
                        alt="Swap"
                        className='w-full h-full px-8'
                    />
                  </div>
                </div>
        </div>
    </div>
  )
}

export default Swap