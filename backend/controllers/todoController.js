const Todo = require("../models/todoModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")


// Get all todos
const getAllTodos = async (req, res)=> {
    // Getting todos only for the logged in user.
    const userId = req.user._id;

    try{
        const todos = await Todo.find({userId}).sort({createdAt: -1});
        res.status(200).json(todos) 
    } catch(err){
        res.status(400).json({ error: "Could not find any document." });
    }
}

// Get all todos
const createTodo = async (req, res)=> {

    const { title, completed } = req.body;
    const userId = req.user._id;
    
    try{
        const todo = await Todo.create({title, userId })
        res.status(200).json({todo})
    }
    catch(err){
        res.status(404).json({error: err})
        console.log(err)
    }
}

// Get all todos
const deleteTodo = async (req, res)=> {

    if(mongoose.Types.ObjectId.isValid(req.params._id)){

        try{
            const todo = await Todo.findOneAndDelete({_id: req.params.id})
            res.status(200).json({ todo })
        }
        catch(err){
            res.status(400).json({ error: "Could not delete Todo." })
        }
    } else {
        res.status(500).json({ error: "The document was not found" })
    }
    
   
}

// Get all todos
const updateTodo = async (req, res)=> {

}


module.exports = {
    getAllTodos,
    createTodo,
    deleteTodo,
    updateTodo
}