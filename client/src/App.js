import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import LandingPage from "./root-views/LandingPage.js";

import URL from './config'
import Menu from './E-commerce/views/Menu'
import Cart from './E-commerce/views/Cart'
import MusicPage from './Blog/views/MusicPage'
import Profile from './Blog/views/Profile'
import Login from './root-components/Login'
import Register from './root-components/Register'
import * as jose from 'jose'

//stripe
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import PaymentSuccess from "./E-commerce/stripe/payment_success";
import PaymentError from "./E-commerce/stripe/payment_error";

//magicLink || Account Recovery
import Enter from './root-components/Enter.js'
import AccountRecovery from "./root-components/AccountRecovery.js"

function App() {

  const [user, setUser] = useState(null);
  const [myCart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  //products from db
  const [MenuList, setMenu] = useState([]);
  //stripe
  const apiKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
  const stripePromise = loadStripe(apiKey);
  //musicItems for blog feed
  const [feed, setFeed] = useState([]);
  //Account Recovery
  const [msg, setMsg] = useState('');
  const sendEmail = async (paramEmail, magicLink) => {
    axios.post(URL+'/Guest/sendEmail', {email: paramEmail, magicLink})
    .then((res) => {
      if(res.data.ok)
      {
        loginHandle(res.data.token)
      }
      else{
        setMsg(res.data.message)
    }})
    .catch((err)=>{
    console.log(err)
    })
    
  }

  useEffect(()=> {
    //Get menuItems from Mongodb
    const getMenu = async () => {
    try{
      const response = await axios.get(URL+'/Products/');
      //console.log(response)
      setMenu(response.data);
    }catch(e){  
      console.log("request to " + URL + "failed")
      console.log(e)
    }
  }
  getMenu();
  //Get musicItems for the social media feed
  const fetchFeed = async () => {
    try {
      const response = await axios.post(URL + "/feed/fetch");
      if(response.data.ok) setFeed(response.data.feedList)
      else alert("Reload, cannot fetch the feed!")
    } catch (error) {
      console.log(error);
      alert("Reload, cannot fetch the feed!")
    }   
  };
  fetchFeed();

  //Verify LocalStorage token
  const verify_token = async () => {
    try {
      if(!token){
        setUser("guest@gmail.com");
        console.log("token not found")
      } else {
        
        const response = await axios.post(URL+'/Guest/verifyToken');
        //console.log(response);
        return response.data.ok ? loginHandle(token) : logout();
      }
    }catch(error){
      console.log(error)
    }
  }
  verify_token();

}, [])

let logout = () => {
  localStorage.removeItem("token");
  setUser('guest@gmail.com');
  setIsLoggedIn(false);
  setCart([]);
  alert("You have logged out");
}

let loginHandle = (token) => {
  let decodedToken = jose.decodeJwt(token);
  setUser(decodedToken.username);
  (decodedToken.cart.length > 0) ? setCart(decodedToken.cart) : setCart([])
  setIsLoggedIn(true);
  localStorage.setItem("token", JSON.stringify(token));
}

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route 
        path={'/Ecommerce/Menu'}
        element={<Menu MenuList={MenuList} logout={logout} setCart={setCart} user={user}/>}
        />
        <Route
        path={'/Ecommerce/Cart'}
        element={
          <Elements stripe={stripePromise}>
            <Cart myCart={myCart} setCart={setCart} user={user} />
          </Elements>
        }
        />
        <Route
        path={'/Login'}
        element={<Login loginHandle={loginHandle}/>}
        />
        <Route
        path={'/Register'}
        element={<Register loginHandle={loginHandle}/>}
        />
        <Route
          path="/payment/success"
          element={<PaymentSuccess
          setCart={setCart} 
          />}
        />
        <Route
          path="/payment/error"
          element={<PaymentError />}
        />
        <Route
          path="/AccountRecovery"
          element={<AccountRecovery 
          sendEmail={sendEmail}
          msg={msg}
          />}
        />
        <Route
            path="sendEmail/:email/:link"
            element={<Enter sendEmail={sendEmail} />}
          />
        <Route 
          path='/Blog'
          element={<MusicPage user={user} feed={feed} setFeed={setFeed}/>}
        />
        <Route 
          path='/Blog/Profile'
          element={<Profile 
            user={user}
            feed={feed}
          />}
        />
      </Routes>
    </Router>
  );
}

export default App;
