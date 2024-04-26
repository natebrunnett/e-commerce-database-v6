import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react"; import axios from "axios"; import * as jose from 'jose'
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";

// import Portfolio from './Portfolio.js'
import URL from './Config.js'
import Portfolio from './PortfolioHome.js'
import Ecommerce from './EcommerceHome.js'
import TodoHome from './TodoHome.js'
import Blog from './SpotifyHome.js'
import Login from './Login-db.js'
import Cart from './Cart.js'

//stripe
//import {loadStripe} from '@stripe/stripe-js'; import {Elements} from '@stripe/react-stripe-js';

// //magicLink || Account Recovery
// import Enter from './root-components/Enter.js'

function Home() {

  const [user, setUser] = useState('guest');
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token-8092")));
  const [todos, setTodos] = useState([]);
  const [Products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

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

let HandleLogout = () => {
  localStorage.removeItem("token-8092");
  setUser('guest');
}

let ProcessToken = async(token) => {
  try {
    if(token){
      console.log('token detected')
      axios.defaults.headers.common["Authorization"] = token;
      let VerifiedToken = await axios.post(URL + '/users/verifyToken', {})
      let DecodedToken = jose.decodeJwt(VerifiedToken);
      setUser(DecodedToken.username);
      console.log(DecodedToken)
      localStorage.setItem("token-8092", JSON.stringify(token));
      if(DecodedToken.todos !== undefined) setTodos(DecodedToken.todos)
      else if(DecodedToken.cart !== undefined) setCart(DecodedToken.cart)
      else return null;
    }
    else{
      const response = await axios.post(URL + '/users/guest');  
      localStorage.setItem("token-8092", JSON.stringify(response.data));
      console.log('guest token saved to Local Storage')
    }
  }
  catch (e){
    console.log(e)
  }
}

useEffect(() => {
  ProcessToken(token);
}, [token])

  return (
    <Router>
      <section className=" overflow-x-hidden">
        <Navbar setUser={setUser} user={user} HandleLogout={HandleLogout}/>
      </section>
      <Routes>
        <Route path="/" element={<Portfolio />} />

        <Route 
        path={'/Ecommerce'}
        element={<Ecommerce Products={Products} setProducts={setProducts} user={user} ProcessToken={ProcessToken}/>}
        />
        
        <Route 
        path={'/TodoApp'}
        element={<TodoHome ProcessToken={ProcessToken} user={user} setUser={setUser} setTodos={setTodos} todos={todos}/>}
        />
        <Route
        path={'/Login'}
        element={<Login ProcessToken={ProcessToken}/>}
        />
        {/*<Route
            path="sendEmail/:email/:link"
            element={<Enter />}
        />*/}
        <Route 
          path='/Blog'
          element={<Blog user={user}/>}
        />
        <Route 
          path='/Cart'
          element={<Cart cart={cart} setCart={setCart} ProcessToken={ProcessToken}/>}
        />
      </Routes>
      <section className=" overflow-x-hidden">
        <Footer/>
      </section>
    </Router>
  );
}

export default Home;
