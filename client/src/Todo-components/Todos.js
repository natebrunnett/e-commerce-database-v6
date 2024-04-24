import React, {useState, useEffect} from 'react'
import WriteDetails from './WriteDetails'

function Todos({todos, deleteTodo, setTodos, updateTodo}) {
    const [open, setOpen] = useState([]);

    useEffect(() => {
        let populateOpen = () => {
            let temp;
            if(todos.length > open.length) temp = [];
            else temp = [...open];
            todos.map(() => {
                temp.push(false);
                setOpen(temp);
            })
        }
        if(todos.length > 0) populateOpen()
    }, [todos])


    return (
        <div className='flex flex-col items-center mt-3'>
        {todos.map((todo, key) => { 
            return(
            <div key={key} className='flex flex-col'>
                <div 
                    className='flex flex-row items-center w-96 justify-between '
                    
                >
                    <h1 className={todo.color}>{todo.title}</h1>
                    <div className='flex flex-row items-center'>
                        <button 
                            className='p-2 rounded-full ml-2 text-white text-3xl mb-1'
                            onClick={() => {
                                setOpen(prev => {
                                    let temp = [...prev];
                                    temp[key] =!temp[key];
                                    return temp;
                                })
                            }}
                        >≡</button>
                        <button className='mb-1 pt-1 text-lg' onClick={() => deleteTodo(todo, key)}>❌</button>
                    </div>
                </div>
                {open[key] && <WriteDetails todo={todo} setTodos={setTodos} updateTodo={updateTodo} index={key}/>}
            </div>)})
        }
        </div>
    )
}

export default Todos