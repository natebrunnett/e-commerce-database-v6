const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    color: {type: String, required: false},
  });

  const cartSchema = new mongoose.Schema(
    {
        image: [{type: String, required: true}],
        name: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true},
    }
  )

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  todos: [{type: todoSchema, required: true}],
  cart: [{type: cartSchema, required: true}],
});

module.exports = mongoose.model("users-public", userSchema);