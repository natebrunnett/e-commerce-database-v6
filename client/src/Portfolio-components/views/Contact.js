import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Contact() {

    let navigate = useNavigate();

    const [form, setValues] = useState({
        subject: '',
        email: '',
        message: '',
    })

    const HandleChange = (e) => {
        e.preventDefault();
        setValues({...form,
            [e.target.name] : e.target.value
        })
    }

    const HandleSend = async(e) => {
        e.preventDefault()
        console.log(form)
        const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/mail/send', {subject: form.subject, email: form.email, message: form.message});
        if(response.data.ok === true){
            setValues({
                subject: '',
                email: '',
                message: '',
            })
            alert("Message sent");
            navigate('/');
        }
        else{
            alert("Form error, see console via developer tools");
            console.log(response.data.error);
        }

    }


  return (
    <div className='flex flex-col items-center'>
        <form
            onChange={HandleChange}
            onSubmit={HandleSend}
        >
            <div>
                <h1 className='text-lg font-bold text-blue-300'>Subject</h1>
                <input className="text-black rounded-md h-8 bg" name="subject"/>
            </div>
            <div>
                <h1 className='text-lg font-bold text-blue-300'>Your email</h1>
                <input className="text-black rounded-md h-8 bg" name="email"/>
            </div>
            <div>
                <h1 className='text-lg font-bold text-blue-300'>Message</h1>
                <textarea className="text-black rounded-md h-32 w-80 bg" name="message"/>
            </div>
            <div className='flex justify-center pt-3'>
                <button className=" bg-blue-400 w-32 h-12 rounded-md">Send</button>
            </div>
            
        </form>
    </div>
  )
}

export default Contact