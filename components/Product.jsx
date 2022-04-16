import React from 'react'

function Product({title, content, btn_text, img, left}) {
  return (
    <div className={`w-full flex  justify-between mb-12  ${left ? 'lg:flex-row flex-col-reverse' : 'flex-col-reverse lg:flex-row-reverse'}`}>
        <div className={`flex items-start justify-center flex-col px-4 pb-8 flex-1 my-4 space-y-5`}>
            <h1 className='text-left text-white font-bold text-3xl leading-10'>{title}</h1>
            <span className='text-left text-gray-500 font-semibold text-lg'>{ content }</span>
            <button className='py-3 hover:border-2px hover:border-white px-8 border-[1px] bg-transparent text-white font-bold border-[#58555E] rounded-xl text-lg lg:text-2xl'>
                {btn_text}
            </button>
        </div>
        <div className={`flex-1 lg:w-full w-full md:w-[80%] my-4 flex px-4 items-start`}>
            <img src={img} alt='product_image' className="w-full"/>
        </div>
    </div>
  )
}

export default Product