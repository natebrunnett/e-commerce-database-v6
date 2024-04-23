import React from 'react'
import {useNavigate} from 'react-router-dom'

function Header() {
  let navigate = useNavigate();
  return (
    <div class='flex flex-col mx-12 my-12 items-center'>
      <h1 class='text-white font-bold text-4xl'>Music Blogger<span className=' text-xs'> v.3.0</span></h1>
      <p class='text-[#adff2f] text pt-3 w-96 text-center mb-3'>This blog acts as a social media platfrom
        for music enthusiasts who want to share
        their love for their favorite artist.
      </p>
      <div>
        <button  className="bg-white text-black p-3 rounded-3xl"onClick={() => {navigate('/Login')}}
        >Login
        </button>
      </div>
    </div>
  )
}

export default Header