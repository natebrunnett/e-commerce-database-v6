import React from 'react';
import { useNavigate } from 'react-router-dom';
import URL from './Config'
import axios from 'axios'
import * as jose from 'jose'
import { FaShoppingCart } from "react-icons/fa";
import {useState, useEffect} from 'react'
import {motion} from 'framer-motion';


let EcommerceHome = ({user, Products, setProducts}) => {

    const [cart, setCart] = useState([]);
    let navigate = useNavigate()

    useEffect(()=> {
        const GET_PRODUCTS = async() => {
            try{
                console.log("GET_PRODUCTS")
                const response = await axios.get(URL+'/products/getAll')
                setProducts(response.data)
            }catch(err){
                console.log(err)
            }
        }
        Products.length == 0 && GET_PRODUCTS()
    }, [])

	let renderProducts=()=>(
        Products.map((prod,idx)=>{
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
    menuItem = Products[parseInt(number)];
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
    <motion.div  initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}    transition={{ duration: 1.15 }} >
    
    <div className='flex flex-row items-center justify-center cursor-pointer mt-3 bg-orange-500 w-24 h-24 pr-1 rounded-full bottom-1 right-1 fixed' onClick={() => navigate('/Ecommerce/Cart')}><FaShoppingCart size={"32px"}/></div>
    <div className='flex flex-col items-center'><h1 className='italic text-2xl mt-2 mb-3'>Stripe Implementation</h1></div>
	{renderProducts()}
	
    </motion.div>)
}

export default EcommerceHome