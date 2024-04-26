import React, {useState, useEffect} from 'react'
import axios from 'axios';
import * as jose from 'jose'
import Header from './Todo-components/Header'
import Write from './Todo-components/Write'
import Todos from './Todo-components/Todos'
import URL from './Config.js'
import DeveloperNotes from './Todo-components/DeveloperNotes';
import {motion} from 'framer-motion';

function Home({user, setUser, ProcessToken, todos, setTodos}) {
    const defaultColor = "text-lime-400";

    let addTodo = async(todo) => {
        try {
            todo.color = defaultColor;
            const response = await axios.post(URL + '/todos/add', {todo, currentTodos: todos, user});
            await ProcessToken(response.data);
        } catch (error) { console.log(error); }
    }

    let deleteTodo = async(todo, idx) => {
        try {
            todo.index = idx; //we only need to add an idx if user is guest
            const response = await axios.post(URL + '/todos/delete', {todo, currentTodos: todos, user});
            await ProcessToken(response.data);
        } catch (error) { console.log(error); }
    }

    let updateTodo = async(form, idx) => {
        try {
            form.index = idx;
            const response = await axios.post(URL + '/todos/update', {form, currentTodos: todos, user});
            await ProcessToken(response.data);
          } catch (error) { console.log(error); }
    }



    return (
    <motion.div  initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}    transition={{ duration: 1.15 }} >
        <main className='h-screen bg-slate-700 flex flex-col items-center'>
            <Header />
            <Write setTodos={setTodos} todos={todos} addTodo={addTodo}/>
            <Todos todos={todos} deleteTodo={deleteTodo} setTodos={setTodos} updateTodo={updateTodo}/>
            <DeveloperNotes />
        </main>
    </motion.div>
    )
}

export default Home