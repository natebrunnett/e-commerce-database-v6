const Users = require('./user-model.js');
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const { response } = require('express');

class User {

	async findAllReturn(req, res){
		try{
			// const allUsers = await Users.find({});
			// res.send(allUsers)
            console.log(req.body)
		}catch(e){
			res.send({e})
		}
	}

    async createGuestToken(req, res){
        try {
            const token = jwt.sign({ username: 'guest', todos: []}, process.env.JWT_SECRET, {
                expiresIn: "365d",
            });
            res.send(token)
        } catch (error) {
            console.log(error)
        }
    }
    
    async addUser(req, res){
        const salt = 'learn2code8134'
        try {
            if(!req.body.username) res.send({ok: false, message: "username invalid"})
            if(req.body.password !== req.body.confirmPassword) res.send({ok: false, message: 'passwords do not match'})
            if(!req.body.email) res.send({ok: false, message: 'email invalid'})
            const hash = await argon2.hash(req.body.password, salt);
            // console.log("username = " + req.body.username);
            // console.log("password = " + hash);
            // console.log("email = " + req.body.email);
            await Users.create({
                username: req.body.username,
                password: hash,
                email: req.body.email,
                todos: []
            })
            const token = jwt.sign({ username: req.body.username, todos: []}, process.env.JWT_SECRET, {
                expiresIn: "365d",
            });
            res.send({ok: true, token})
        } catch (error) {
            console.log(error)
        }
    }

    async login(req, res){
        try {
            const user = await Users.findOne({username: req.body.username});
            if(!user) res.send({ok: false, message: "User not found"});
            const match = await argon2.verify(user.password, req.body.password);
            if(match) {
                const token = jwt.sign({ username: req.body.username, todos: user.todos}, process.env.JWT_SECRET, {
                    expiresIn: "365d",
                });
                res.send({ok: true, token})
            } else {
                res.send({ok: false, message: "password invalid"});
            }
            

        } catch (error) {
            console.log('error occured')
            console.log(e)
        }
    }

}

module.exports = new User()