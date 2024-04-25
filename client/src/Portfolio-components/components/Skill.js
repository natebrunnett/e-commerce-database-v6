import React from 'react'

function skill({exampleTest, text}) {
  return (
    <div className='flex cursor-pointer'>
        <img className='relative w-28 h-28 rounded-full z-1' src={exampleTest}/>
        <div className='absolute opacity-0 hover:opacity-100'>
          <div className='rounded-full bg-white w-28 h-28 absolute opacity-75 flex justify-center items-center z-2'/>
          <h1 className='absolute text-black z-3 opacity-100 rounded-full w-28 h-28 flex items-center justify-center font-bold'>{text}</h1>
        </div>
    </div>
  )
}

export default skill