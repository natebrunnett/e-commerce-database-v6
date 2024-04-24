import React from 'react'
import { SocialIcon } from "react-social-icons";
import { IoIosMail } from "react-icons/io";
import {useNavigate} from 'react-router-dom'

function Footer() {
  let navigate = useNavigate();
  return (
    <div className="flex items-center justify-between mx-0 md:mx-32 lg:mx-60 2xl:mx-96">
        <div className="flex flex-row">
          <SocialIcon 
            url="https://www.linkedin.com/in/nathan-brunnett-25773b2b2/"   
            bgColor="transparent"
            fgColor="#A1E7FF"
          />
        </div>
        <div className="flex items-center gap-2 cursor-pointer mr-2"
        onClick={() => navigate('/Contact')}>
          <div>Contact me</div>
          <IoIosMail 
            size={"32px"}
            />
        </div>
      </div>
  )
}

export default Footer