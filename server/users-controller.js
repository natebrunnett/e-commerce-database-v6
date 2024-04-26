const Users = require('./user-model.js');
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const { response } = require('express');
const Stats = require('./stats-model.js');

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

    async addItemToCart(req, res){
        try {
            // console.log(req.body)  //user && product  
            if(req.body.user === 'guest') res.send({ok:false, message: "you gotta log in first"})
            let UserSchema = await Users.findOne({username: req.body.user})
            let tempCart = UserSchema.cart;
            tempCart.push(req.body.SelectedProduct);
            const token = jwt.sign({ username: req.body.user, todos: UserSchema.todos ,cart: tempCart}, process.env.JWT_SECRET, {expiresIn: "365d",});
            await Users.updateOne({username: req.body.user}, {cart: tempCart})
            res.send({ok: true, token})

        } catch (error) {
            console.log(error)
        }
    }
    

    // async ADMIN_ROUTE_CREATE_VIEWS_STAT(req, res) {
    //     try {
    //         await Stats.create({GuestTokensCreated: 0});
    //         console.log({ok: true})
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }

    // async debug(req, res){
    //     try {
            
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    
    async addUser(req, res){
        const salt = 'learn2code8134'
        try {
            let ExistingUser = await Users.findOne({username: req.body.username}); //Does this username already exist?
            if(!req.body.username || req.body.username === 'guest' || ExistingUser) res.send({ok: false, message: "username invalid"})
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
            console.log("User was successfully created");
            const token = jwt.sign({ username: req.body.username, todos: []}, process.env.JWT_SECRET, {
                expiresIn: "365d",
            });
            /* TRACK PAGE VIEWS */
            const FetchedObject = await Stats.findOne({})
            let Views = FetchedObject.guestTokensCreated;
            Views = Views + 1;
            await Stats.updateOne({_id: FetchedObject._id}, {guestTokensCreated: Views});
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