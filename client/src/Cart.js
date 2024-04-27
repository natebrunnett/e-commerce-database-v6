import React from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import * as jose from 'jose'
import { useStripe } from "@stripe/react-stripe-js";
import URL from './Config'

function Cart({cart, setCart, ProcessToken, user, token}) {
  
    //stripe
const navigate = useNavigate();
const stripe = useStripe();

const createCheckoutSession = async () => {
    try {
      const response = await axios.post(
        URL+`/payment/create-checkout-session`,
        { list: cart, username: user }
      );
      if(response.data.ok){
        localStorage.setItem(
          "sessionId",
          JSON.stringify(response.data.sessionId)
        )
      ProcessToken(response.data.token);
      redirect(response.data.sessionId)
      }
      else {
        navigate("/payment/error");
      }
    } catch (error) {
      navigate("/payment/error");
    }
  };

const redirect = (sessionId) => {
   
    stripe
      .redirectToCheckout({
        sessionId: sessionId,
      })
      .then(function (result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      });
  };


const calculate_total = () => {
    let total = 0;
    cart.forEach((ele) => (total += ele.quantity * ele.price));
    total = parseFloat(total * .01).toFixed(2);
    return total;
    };

const removeItemFromCart = async(index, token) => {
  try {
    //we need a token if the user is a guest
    console.log(index);
    console.log(token);
  } catch (error) {
    console.log(error);
  }
}

    return (
    <section className='flex flex-col items-center'>
        <h1 className='text-black text-3xl flex flex-row items-center'>CART</h1>
        {cart.map((item, index) => { return (<div key={index} className='flex flex-row'>
            
            <div className='text-black'>{item.name}</div>
            <button onClick={() => removeItemFromCart(index, token)}>❌</button>

        </div>)})}

        <h1>{calculate_total()}</h1>
        <button onClick={() => createCheckoutSession()}>Stripe</button>

    </section>
  )
}

export default Cart