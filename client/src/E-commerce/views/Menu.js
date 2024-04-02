import React from 'react';
import { useNavigate } from 'react-router-dom';
import URL from './../../config'
import axios from 'axios'
import * as jose from 'jose'
import { FaShoppingCart } from "react-icons/fa";

let Menu = ({MenuList, setCart, user, logout}) => {

    let navigate = useNavigate()

	let renderProducts=()=>(
        MenuList.map((prod,idx)=>{
            let thisPrice = parseFloat(prod.price * .01).toFixed(2);
            return(
                <div key={idx} className="flex flex-col items-center mb-3">
                    <img className="w-96 rounded-3xl" src={prod.image[0]} />
                    <button className=' bg-amber-700 text-white p-3 absolute mt-80 rounded-3xl' 
                    onClick={() => AddToCart(idx)}>Add to cart</button>	
                    <div className="text-2xl" ><b>{prod.name}</b></div>
                    <p style={{ fontSize: '14px'}}><b>{thisPrice}€</b></p>
                    <p className="w-96 text-center" >{prod.description}</p>
                    <p className='italic'>Quantity: {prod.quantity}</p>

                </div>
            )
        })
    )

    let AddToCart = (number) =>
    {
    if(user != null){
    //get menuItem data from mongoDb
    let menuItem = {}
    menuItem = MenuList[parseInt(number)];
    //setCart with the newCart data using a token to store it in LocalStorage
    axios.post(URL+'/Guest/addItem', 
        {username:user, product: menuItem})
    .then((res) => {
        let decodedToken = jose.decodeJwt(res.data.token);
        (decodedToken.cart.length > 0) && setCart(decodedToken.cart)
        localStorage.setItem("token", JSON.stringify(res.data.token));
    })
    .catch((err)=>{
        console.log(err)
    })
    }
    else{
    alert("Please login to continue")
    }

    }

	
    return (
	<>
    <div className='flex flex-row items-center justify-center cursor-pointer mt-3
     bg-orange-500 w-24 h-24 pr-1 rounded-full bottom-1 right-1 fixed' onClick={() => navigate('/Ecommerce/Cart')}>
        <FaShoppingCart size={"32px"}/>
    </div>
    <div className='flex flex-col items-center'>
        <div className='flex flex-row gap-2 items-center justify-center mt-2 mb-2'>
            <h1 className='mb-3 mt-3'>Hello, {user}</h1>
            {(user == 'guest@gmail.com')? <button className='bg-amber-700 p-4 rounded-3xl text-white' onClick={() => navigate('/Login')}>Log in</button> : <button  
            className='bg-amber-700 p-4 rounded-3xl text-white' onClick={()=>logout()}>Logout</button>}
        </div>
        <h1 className='font-bold text-4xl mb-3'>Order now :)</h1>
	</div>
	{renderProducts()}

	
    </>)
}

export default Menu