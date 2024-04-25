import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({user, HandleLogout}) => {

  const [open, setOpen] = useState(true)
  let ListStyleHome = 'text-3xl font-bold ml-2'
  let ListStyle = 'text-2xl font-bold ml-4 italic'
  const navigate = useNavigate()

	return (
  <>

    {open? 
      <div className="relative top-0 right-0 z-20 w-screen h-auto overflow-hidden flex pt-0 flex-col items-start outline-dotted outline-2 bg-purple-950">

      {/* Portofolio needs contact me to work nodemailer */}
    <NavLink to={"/"}  style={ ({isActive}) => (isActive ?  CSS.InactiveLink : CSS.ActiveLink)}
      className={ListStyleHome}>Home</NavLink>

    <NavLink to={"/TodoApp"}  style={ ({isActive}) => (isActive ?  CSS.InactiveLink : CSS.ActiveLink)}
      className={ListStyle}>To-do</NavLink>

      {/* Stripe Implementation needs to work && Add to cart */}
    <NavLink to={"/Ecommerce"} style={ ({isActive}) => (isActive ?  CSS.InactiveLink : CSS.ActiveLink)}
    className={ListStyle}>Ecommerce</NavLink>

      {/* Spotify API integration needs to be reimagined */}
    <NavLink to={"/Blog"}  style={ ({isActive}) => (isActive ?  CSS.InactiveLink : CSS.ActiveLink)}
          className={ListStyle}>Spotify API Integration</NavLink> 
    

    {user === 'guest' ? <h1 className=" text-white mr-2 mt-3 absolute right-0 top-28">{user}<span><button onClick={() => navigate('/Login')} className="bg-purple-800 text-slate-300 p-1 text-sm rounded-2xl ml-2">Sign in</button></span></h1>
    : <h1 className=" text-white mr-2 mt-3 absolute right-0 top-28">{user}<span><button onClick={() => HandleLogout()} className="bg-purple-800 text-slate-300 p-1 text-sm rounded-2xl ml-2">Sign out</button></span></h1> }
    
    <div onClick={() => setOpen(false)} className="text-3xl text-center w-screen text-white cursor-pointer">⬆️</div>
    </div>
    
    
    : <div 
      onClick={() => setOpen(true)}
    className="bg-purple-900 w-screen text-white text-center cursor-pointer">⬇️</div> }

  
</>
	)
}

export default Navbar

const CSS = {
  ActiveLink: {
    color: "gray",
  },
  InactiveLink: {
    textDecoration: "none",
    color: "white",
  },
};
//