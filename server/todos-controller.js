const e = require('express');
const jwt = require("jsonwebtoken");
const Users = require('./user-model.js')

class Todo {

	async findAllReturn(req, res){
		try{
			// const items = await Todos.find({});
			// res.send(items)
		}catch(e){
			res.send({e})
		}
	}

    /* add, update, delete functions do not need an if else statement
    if(req.body.user !== 'guest') await Users.updateOne() */

    async addItem(req, res){
        try{
            let tempArray = req.body.currentTodos;
            tempArray.push(req.body.todo);
            if(req.body.user !== 'guest') await Users.updateOne({username: req.body.user}, {todos: tempArray})
            const token = jwt.sign({ username: req.body.user, todos: tempArray}, process.env.JWT_SECRET, {
                expiresIn: "365d",
            });
            res.send(token)
        }catch(e){
           console.log(e);
        }
    }

    async updateItem(req, res){

        try{
            let tempArray = req.body.currentTodos;
            tempArray[req.body.form.index] = req.body.form; 
            if(req.body.user !== 'guest') await Users.updateOne({username: req.body.user}, {todos: tempArray})
            const token = jwt.sign({ username: req.body.user, todos: tempArray}, process.env.JWT_SECRET, {
                expiresIn: "365d",
            });
            res.send(token)
        }catch(e){
            console.log(e)
        }
    }

    async deleteItem(req, res){
        try{
            let tempArray = req.body.currentTodos;
            tempArray.splice(req.body.todo.index, 1);
            if(req.body.user !== 'guest') await Users.updateOne({username: req.body.user}, {todos: tempArray})
            const token = jwt.sign({ username: req.body.user, todos: tempArray}, process.env.JWT_SECRET, {
                expiresIn: "365d",}); 
            res.send(token);      
        }catch(e){
            console.log(e)
        }
    }

}

module.exports = new Todo()