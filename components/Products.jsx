import React from 'react'
import { Products_list } from '../util/product_list';
import Product from './Product';

function Products() {
  return (
    <div className='bg-[#16161D] relative'>
      <div className='lg:py-28 pt-20  max-w-[97%] lg:max-w-[60%] mx-auto'>
      <div className='items-center justify-center flex flex-col space-y-6 lg:space-y-10'>
            <h1 className='font-bold text-3xl lg:text-5xl text-white leading-10 tracking-wide font-Catamaran'>Products & Services</h1>
            <span className='text-[#939197] lg:px-20 px-2 text-center text-lg font-semibold leading-8 tracking-wide'>
            The CoinSwap Platform has a suite of products in Decentralized Finance. It is the perfect ecosystem for automated liquidity that is provisioned on the Binance Smart Chain,
             giving incentives to the communityfor their efforts to our AMM model.
            </span> 
        </div>
        {/* <div className='w-full absolute left-0 pb-16'>
        <img 
            src="/img/left_deco.svg"
            alt="Logo"
            className='w-full'
        /> */}
      {/* </div> */}
        <div className='w-full flex flex-col  pt-20'>
            {
                Products_list.map((x, i) => (
                    <Product key={i} title={x.title} content={x.content} img={x.img} btn_text={x.btn_text} left={ i % 2  === 0 ? true : false } />
                ))
            }
        </div>
        <div className='flex flex-col items-center py-16 lg:py-0 max-w-[70%] lg:max-w-[30%] mx-auto'>
            <button className='text-center w-full px-12 py-4 bg-[#12FFB8] border-none font-semibold text-lg lg:text-2xl text-gray-800 rounded-xl'>go_to_dapp</button>
        </div>
      </div>
    </div>
  )
}

export default Products