import Image from 'next/image'
import React from 'react'

function Footer() {
  return (
    <div className='bg[#1D1D26] w-full py-12'>
        <div className="lg:max-w-[80%] max-w-[90%] mx-auto grid grid-cols-4">
            <div className='lg:col-span-2 col-span-4 items-start'>
                <div className='lg:w-[50%] w-[60%] mb-12 -ml-4  lg:mb-0'>
                    <div className='flex mb-8 items-center'>
                        <Image 
                            src="/img/coin_logo.png"
                            alt="Logo"
                            width={60}
                            height= {60}
                        />
                    <span className='font-bold text-white font-Catamaran text-2xl'>Coinswap</span>
                    </div>
                    <div className='span px-4'>
                        The CoinSwap Platformhas a suite of products inDecentralized Finance
                    </div>
                </div>
            </div>
            <div className='flex flex-col col-span-2 lg:col-span-1 space-y-2 lg:space-y-4 '>
                <h1 className='text-white mb-4 font-semibold  text-xl'>Overview</h1>
                <span className='span'>FAQ</span>
                <span className='span'>Roadmap</span>
                <span className='span'>Fees</span>
                <span className='span'>Refer a Friend</span>
                <span className='span'>Overall Guide</span>
                <span className='span'>Doc</span>
            </div>
            <div className='flex flex-col col-span-2 lg:col-span-1 space-y-2 lg:space-y-4'>
                <h1 className='text-white mb-4 text-xl font-semibold'>Products & Services</h1>
                <span className='span'>SpacePad</span>
                <span className='span'>AMM/Swap</span>
                <span className='span'>Yeild Farming</span>
                <span className='span'>Stake</span>
                <span className='span'>FAQ</span>
                <span className='span'>Token Listing</span>
            </div>
        </div>
    </div>
  )
}

export default Footer