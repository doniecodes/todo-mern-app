const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    userId: {
        type: String,
        required: true,
    }
}, { timestamps: true })


const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;