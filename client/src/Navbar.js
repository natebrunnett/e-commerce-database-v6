import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = ({user, setUser}) => {

  const [open, setOpen] = useState(false)
  let ListStyle = 'text-3xl font-bold ml-2'

	return (
  <>

    {open? 
      <div className="top-0 right-0 z-20 w-screen h-28 flex pt-0 flex-col items-start outline-dotted outline-2 bg-purple-950">
    <button onClick={() => setOpen(false)}className="text-3xl absolute right-2 text-white">X</button>

    <NavLink to={"/TodoApp"}  style={ ({isActive}) => (isActive ?  CSS.InactiveLink : CSS.ActiveLink)}
      className={ListStyle}>To-do</NavLink>

    <NavLink to={"/Ecommerce"} style={ ({isActive}) => (isActive ?  CSS.InactiveLink : CSS.ActiveLink)}
    className={ListStyle}>Ecommerce</NavLink>
{/* 
    <NavLink to={"/Blog"}  style={ ({isActive}) => (isActive ?  CSS.InactiveLink : CSS.ActiveLink)}
      className={ListStyle}>Blog</NavLink>  */}
    

    <h1 className=" text-white mr-2 mt-4 absolute right-0 top-16">{user}
    <span><button className="bg-purple-800 text-slate-300 p-1 text-sm rounded-2xl ml-2">Signout</button></span></h1>

    </div>
    
    
    : <button 
      onClick={() => setOpen(true)}
    className="bg-purple-900 text-white absolute right-1">open</button> }

  
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