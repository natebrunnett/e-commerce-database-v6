import React from "react";
import { NavLink } from "react-router-dom";
import { MdRestaurantMenu } from "react-icons/md";

const Navbar = () => {
	return (
  <>
    <div className="flex flex-row bg-black justify-between items-center">
    <NavLink to={"/Ecommerce/Menu"} className="text-3xl font-bold flex items-center gap-1 pt-1 pb-1"
    style={ ({isActive}) => (
      isActive ? linkStyles.activeLink : linkStyles.defaultLink
    )}>E commerce<MdRestaurantMenu size={"32px"}/>
    </NavLink>

    <NavLink to={"/Blog"} className="text-3xl font-bold flex items-center gap-1 pr-2 pt-1 pb-1"
    style={ ({isActive}) => (
      isActive ? linkStyles.activeLink : linkStyles.defaultLink
    )}>Blog
    </NavLink>
    </div>
  
  </>
	)
}

export default Navbar

const linkStyles = {
  activeLink: {
    color: "gray",
  },
  defaultLink: {
    textDecoration: "none",
    color: "white",
  },
};
//