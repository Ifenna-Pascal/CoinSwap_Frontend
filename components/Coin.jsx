import React from 'react'

function Coin({name, img, index, select = () => {}, click = () => {}}) {
  const handleClicks = () => {
      select(index);
      click(true)
  }
  return (
    <div className='flex space-x-2  hover:cursor-pointer   items-center justify-end mr-4' onClick={ handleClicks}>
        <div className='flex-flex-col w-8 h-8 items-center'>
            <img src={img} className='w-full' />
        </div>
        <span className='text-white font-xl font-bold text-lg'>{name}</span>
    </div>
  )
}

export default Coin