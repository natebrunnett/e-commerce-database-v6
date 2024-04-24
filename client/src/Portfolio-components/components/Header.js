import React from 'react'
import { Cursor, Typewriter } from 'react-simple-typewriter'
import pfp from '../media/pfp-v2-square.png';

function Header() {
  return (
  <div className='flex md:flex-row items-center justify-center sm: flex-col'>
    <div className='flex flex-row mt-3 items-center'>
      <img 
          className="w-32 rounded-full mt-3 mr-3 mb-3"
          src={pfp}>
      </img>
      <div className='flex flex-col items-center'>
        <h1 className="text-blue-600 font-bold text-4xl"></h1>
        <h1 className='w-64 text-center'>
          <Typewriter 
                words= {[
                  "Hello world!",
                  "Hallo wereld!",
                  "Hola mundo!",
                ]}
                loop={true}
                delaySpeed={2000}
          />
          <Cursor cursorColor="blue"/>
        </h1>
      </div>
    </div>
    <div className='flex flex-col ml-5'>
      <h1>Hi, I'm Nathan</h1>
      <p className='w-96 text-sm'>I am a Javascript / React developer.  My coding stack in Mongodb, Express, React, and Nodejs.
      I usually code in JavaScript and prefer to Visual Studio Code as well as Windows to create applications.  I use gitbash
      and git regularly to create projects for my portfolio.  I am interested in pursuing a career as a junior developer. </p>
    </div>

  </div>
  )
}

export default Header