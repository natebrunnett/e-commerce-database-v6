import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {

  const [open, setOpen] = useState(false)
  let ListStyle = 'text-3xl font-bold ml-2'

	return (
<>

    {open? <>
      <div className="top-5 left-5 w-64 h-36 flex pt-0 flex-col items-start outline-dotted outline-2 bg-purple-900">
    <button onClick={() => setOpen(false)}className="text-3xl absolute right-1">X</button>

    <NavLink to={"/To-do"}  style={ ({isActive}) => (isActive ?  CSS.InactiveLink : CSS.ActiveLink)}
      className={ListStyle}>To-do</NavLink>

    <NavLink to={"/Ecommerce"} style={ ({isActive}) => (isActive ?  CSS.InactiveLink : CSS.ActiveLink)}
    className={ListStyle}>Ecommerce</NavLink>

    <NavLink to={"/Blog"}  style={ ({isActive}) => (isActive ?  CSS.InactiveLink : CSS.ActiveLink)}
      className={ListStyle}>Blog</NavLink> 
    </div></>
    : <button 
      onClick={() => setOpen(true)}
    className="bg-purple-700 text-white absolute right-1">open</button> }

  
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