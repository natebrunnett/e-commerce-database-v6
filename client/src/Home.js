import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react"; import axios from "axios"; import * as jose from 'jose'
import Navbar from "./Navbar.js";

// import Portfolio from './Portfolio.js'
import URL from './Config.js'
import Portfolio from './Portfolio.js'
import Ecommerce from './Ecommerce.js'
import Blog from './Blog.js'
// import Login from './root-components/Login'

//stripe
//import {loadStripe} from '@stripe/stripe-js'; import {Elements} from '@stripe/react-stripe-js';

// //magicLink || Account Recovery
// import Enter from './root-components/Enter.js'

function Home() {

  const [user, setUser] = useState(null);
  // const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  //stripe
  // const apiKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
  // const stripePromise = loadStripe(apiKey);

  // const sendEmail = async (paramEmail, magicLink) => {
  //   axios.post(URL+'/Guest/sendEmail', {email: paramEmail, magicLink})
  //   .then((res) => {
  //     if(res.data.ok)
  //     {
  //       ProcessToken(res.data.token)
  //     }
  //     else{
  //       setMsg(res.data.message)
  //   }})
  //   .catch((err)=>{
  //   console.log(err)
  //   })
  // }

// let HandleLogout = () => {
//   localStorage.removeItem("token");
//   setUser('guest');
//   setCart([]);
//   alert("You have logged out");
// }

// let ProcessToken = (token) => {
//   let decodedToken = jose.decodeJwt(token);
//   setUser(decodedToken.username);
//   (decodedToken.cart.length > 0) ? setCart(decodedToken.cart) : setCart([])
//   setIsLoggedIn(true);
//   localStorage.setItem("token", JSON.stringify(token));
// }

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Portfolio />} />

        <Route 
        path={'/Ecommerce'}
        element={<Ecommerce user={user}/>}
        />
        {/*<Route
        path={'/Login'}
        element={<Login loginHandle={ProcessToken}/>}
        />*/}
        {/*<Route
            path="sendEmail/:email/:link"
            element={<Enter />}
        />*/}
        <Route 
          path='/Blog'
          element={<Blog user={user} />}
        />
      </Routes>
    </Router>
  );
}

export default Home;
