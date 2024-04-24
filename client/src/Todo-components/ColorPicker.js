import React, {useEffect, useState} from 'react'

function ColorPicker({handleSubmit, setValues, form, setOpen, open}) {

    const [componentDidMount, setComponentDidMount] = useState(false);

    let handleClick = (thisColor) => {
        setValues(
            {
               ...form,
                color : thisColor
            }
        )
        setComponentDidMount(true)
    }

    useEffect(()=> {
        if(componentDidMount === true){
            setComponentDidMount(false)
            handleSubmit();
            setOpen(!open)
        }
    }, [form])


    return (
        <section className='grid grid-cols-3 gap-0 absolute top-0 right-5'>
            <div 
                className='w-8 h-8 bg-white border-2 ' 
                onClick={() => handleClick('text-white')}
            ></div>
            <div 
                className='w-8 h-8 bg-yellow-200 border-2 ' 
                onClick={() => handleClick('text-yellow-200')}
            ></div>
            <div 
                className='w-8 h-8 bg-orange-400 border-2 ' 
                onClick={() => handleClick('text-orange-400')}
            ></div>
            <div 
                className='w-8 h-8 bg-lime-400 border-2 ' 
                onClick={() => handleClick('text-lime-400')}
            ></div>
            <div 
                className='w-8 h-8 bg-red-400 border-2 ' 
                onClick={() => handleClick('text-red-400')}
            ></div>
            <div 
                className='w-8 h-8 bg-cyan-400 border-2 ' 
                onClick={() => handleClick('text-cyan-400')}
            ></div>
            <div 
                className='w-8 h-8 bg-purple-400 border-2 ' 
                onClick={() => handleClick('text-purple-400')}
            ></div>
            <div 
                className='w-8 h-8 bg-amber-300 border-2 ' 
                onClick={() => handleClick('text-amber-300')}
            ></div>
            <div 
                className='w-8 h-8 bg-black border-2 ' 
                onClick={() => handleClick('text-black')}
            ></div>

        </section>
    )
}

export default ColorPicker