import React from 'react'
import { SocialIcon } from "react-social-icons";
import spotifyImg from '../media/spotifyForum.png';
import ticTacToe from '../media/ticTacToe.png';
import EcommerceImg from '../media/ECommercePfp.png';
import pingPong from '../media/ping-pong-react.jpg';
import MeasConv from '../media/measurement-conversion.jpg'
import todoappPfp from '../media/to-do-app-pfp.jpg'

function CyclicApps() {
  return (
    <div className='flex flex-col justify-center items-center bg-[rgb(36,36,36)]'>
    <h1 className="text-blue-600 font-bold text-4xl italic mt-3">Projects</h1>
    <div>
        <a href='https://fair-leotard-cod.cyclic.app/'>
        <div className='flex flex-col items-center'>
            <h1 className=' text-center font-bold mt-3 text-2xl mb-4'>E commerce full stack app</h1>
            <img className=" rounded-3xl w-96 h-96 object-cover border-2 border-gray-600" src={EcommerceImg}/>
            <div className='flex flex-row items-center justify-center'>
            <p className='text-center max-w-64 mt-2'>Fullstack e commerce with React, Mongodb, Express and Stripe</p>
            <SocialIcon 
            url="https://fair-leotard-cod.cyclic.app/"   
            bgColor="transparent"
            fgColor="
            #FFC7C7"
            />
            <SocialIcon 
            url="https://github.com/natebrunnett/e-commerce-react-express-mongodb-v.4.0"   
            bgColor="transparent"
            fgColor="
            #FFC7C7"
            />
            </div>
        </div>
        </a>
        <a href="https://github.com/natebrunnett/to-do-app-react-v1/">
        <div className='flex flex-col items-center'>
            <h1 className=' text-center font-bold mt-3 text-2xl mb-4'>To do app React</h1>
            <img className=" rounded-3xl w-96 h-96 object-cover border-2 border-gray-600" src={todoappPfp}/>
            <div className='flex flex-row items-center justify-center'>
            <p className='text-center max-w-64 mt-2'>Mongodb, Express, React, Nodejs</p>
            <SocialIcon 
            url="https://github.com/natebrunnett/to-do-app-react-v1/"   
            bgColor="transparent"
            fgColor="#FFC7C7"
            />
            </div>
        </div>
        </a>
        <a href="https://dull-gold-swordfish-slip.cyclic.app/">
        <div className='flex flex-col items-center'>
            <h1 className=' text-center font-bold mt-3 text-2xl mb-4'>Spotify API integration</h1>
            <img className=" rounded-3xl w-96 h-96 object-cover border-2 border-gray-600" src={spotifyImg}/>
            <div className='flex flex-row items-center justify-center'>
            <p className='text-center max-w-64 mt-2'>React app made with Axios, Postman, and Tailwindcss</p>
            <SocialIcon 
            url="https://dull-gold-swordfish-slip.cyclic.app/"   
            bgColor="transparent"
            fgColor="#FFC7C7"
            />
            <SocialIcon 
            url="https://github.com/natebrunnett/Blog-Clone-v.3.0"   
            bgColor="transparent"
            fgColor="#FFC7C7"
            />
            </div>
        </div>
        </a>
        <a href='https://github.com/natebrunnett/tic-tac-toe-angular-tailwindcss-typescript'>
        <div className='flex flex-col items-center'>
            <h1 className=' text-center font-bold mt-3 text-2xl mb-4'>Tic tac toe</h1>
            <img className=" rounded-3xl w-96 h-96 object-cover border-2 border-gray-600" src={ticTacToe}/>
            <div className='flex flex-row items-center justify-center'>
            <p className='text-center'>Angular app with TypeScript</p>
            <SocialIcon 
            url="https://github.com/natebrunnett/tic-tac-toe-angular-tailwindcss-typescript"   
            bgColor="transparent"
            fgColor="#FFC7C7"
            />
            </div>
        </div>
        </a>
        <a href='https://github.com/natebrunnett/ping-pong-react-v3'>
        <div className='flex flex-col items-center'>
            <h1 className=' text-center font-bold mt-3 text-2xl mb-4'>Ping pong</h1>
            <img className=" rounded-3xl w-96 h-96 object-cover border-2 border-gray-600 " src={pingPong}/>
            <div className='flex flex-row items-center justify-center'>
            <p className='text-center'>Ping pong app with React</p>
            <SocialIcon 
            url="https://github.com/natebrunnett/ping-pong-react-v3"   
            bgColor="transparent"
            fgColor="#FFC7C7"
            />
            </div>
        </div>
        </a>
        <a href='https://github.com/natebrunnett/measurement-conversion'>
        <div className='flex flex-col items-center'>
            <h1 className=' text-center font-bold mt-3 text-2xl mb-4'>Measurement Conversion</h1>
            <img className=" rounded-3xl w-96 h-48 object-cover border-2 border-gray-600" src={MeasConv}/>
            <div className='flex flex-row items-center justify-center'>
            <p className='text-center'>Metric to Imperial with React</p>
            <SocialIcon 
            url="https://github.com/natebrunnett/measurement-conversion"   
            bgColor="transparent"
            fgColor="#FFC7C7"
            />
            </div>
        </div>
        </a>
    </div>



    </div>
  )
}

export default CyclicApps