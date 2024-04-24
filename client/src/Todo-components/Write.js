import React, {useState} from 'react'

function Write({todos, setTodos, addTodo}) {

    const [form, setValues] = useState({
        title : ''
    })

    let handleChange= (e) =>{
        e.preventDefault();
            setValues(
          { 
            ...form, 
            [e.target.name]: e.target.value 
          }
        );
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        addTodo({ title: form.title});
        setValues({
            title: ''
        })
    }
        

    return (
        <form
            onSubmit={handleSubmit}
        >
        <div className='flex flex-row justify-center mt-3'>
            <input 
                className='rounded-l-2xl pl-2' 
                placeholder='...my first to do'
                name="title"
                value={form.title}
                onChange={handleChange}
            />
            <button className='bg-lime-400 p-2 rounded-r-2xl'>Add</button>
        </div>
        </form>
    )
}

export default Write