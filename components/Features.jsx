import React from 'react'
import Card from './Card';

function Features () {
  return (
    <div className='relative py-16 lg:py-32 z-10' id='about'>
    <div className='lg:w-full w-[97%] mx-auto grid lg:grid-cols-3 space-y-5 lg:space-y-0 lg:space-x-8'>
        <Card 
          header="Vision" 
          content="To create a strong foundation for the community by giving them incentives in exchange for their support towards our AMM model." 
          img="/img/eye.svg"
        />
        <Card 
          header="Value" 
          content="Creating tokens that the community can use in exchange for products and services that are being offered on the CSS Platform." 
          img="/img/map.svg"
        />
        <Card
          header="Target" 
          content="Our main target is consumers that are avoiding the high gas fees of Ethereum Blockchain. We are also aiming to become the best platform.." 
          img="/img/point.svg"
        />
    </div>
    <div className='absolute top-0 lg:bottom-10 lg:-left-24 right-0 w-[9rem] lg:w-[11rem]'>
        <img 
            src="/img/planet.png"
            alt="Logo"
            className='w-full'
        />
    </div>
    </div>
  )
}

export default Features;