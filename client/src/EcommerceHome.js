import React from 'react';
import { useNavigate } from 'react-router-dom';
import URL from './Config'
import axios from 'axios'
import * as jose from 'jose'
import { FaShoppingCart } from "react-icons/fa";
import {useState, useEffect} from 'react'
import {motion} from 'framer-motion';


let EcommerceHome = ({user, Products, setProducts, ProcessToken}) => {

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
                <div key={idx} className="flex flex-row items-center mb-3">
                    <img className="w-24 rounded-3xl" src={prod.image[0]} />
                    <button className=' bg-slate-300 text-white p-3 rounded-3xl' 
                    onClick={() => AddToCart(idx)}>❤️</button>	
                    <div className="text-md w-full" ><b>{prod.name}</b></div>
                    <p style={{ fontSize: '14px'}}><b>{thisPrice}€</b></p>
                    <p className="w-96 text-center" >{prod.description}</p>

                </div>
            )
        })
    )

    let AddToCart = async(idx) =>
    {
    if(user != 'guest' || user != null){
    //get menuItem data from mongoDb
    let SelectedProduct = {}
    SelectedProduct = Products[parseInt(idx)];
    //setCart with the newCart data using a token to store it in LocalStorage
        try {
            let response = await axios.post(URL+'/users/addItemToCart', {SelectedProduct, user})
            console.log(response)
            console.log("response recieved")
            ProcessToken(response.data.token)
        } catch (error) {
            console.log(error)
        }
    }
    else{
    alert("Please login to continue")
    }

    }

	
    return (
    <motion.div  initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}    transition={{ duration: 1.15 }} >
    
    <div className='flex flex-row items-center justify-center cursor-pointer mt-3 bg-orange-500 w-24 h-24 pr-1 rounded-full bottom-1 right-1 fixed opacity-50 hover:opacity-100' onClick={() => navigate('/Cart')}><FaShoppingCart size={"32px"}/></div>
    <div className='flex flex-col items-center'><h1 className='italic text-2xl mt-2 mb-3'>Stripe Implementation</h1></div>
    {renderProducts()}
	
    </motion.div>)
}

export default EcommerceHome