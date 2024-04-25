import React from 'react'
import {useNavigate} from 'react-router-dom'

function Header() {
  let navigate = useNavigate();
  return (
    <div class='flex flex-col mx-12 my-12 items-center'>
      <h1 class='text-white font-bold text-4xl text-center'>Spotify API integration</h1>
      <p class='text-[#adff2f] text pt-3 w-96 text-center mb-3'>Get data from Spotify and use it across your application</p>
    </div>
  )
}

export default Header