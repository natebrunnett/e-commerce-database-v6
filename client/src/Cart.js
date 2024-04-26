import React from 'react'
import {useNavigate} from 'react-router-dom'

function Cart({cart, setCart, ProcessToken}) {
  
    let navigate = useNavigate();
    return (
    <section>
        <h1 className='text-black text-3xl flex flex-row items-center'>CART</h1>
        {cart.map((item, index) => { return (<div key={index} className='flex flex-row'>
            
            <div className='text-black'>{item.name}</div>
            <button>❌</button>

        </div>)})}

    </section>
  )
}

export default Cart