const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password is too short"]
    }
})

// hash passwords on pre save event.
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// Login Statics
userSchema.statics.login = async function (email, password){
    if(!email){
        throw Error("no email");
    }

    if(!password){
        throw Error("no password");
    }

    const user = await this.findOne({email});
    if(user){
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(passwordMatch){
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email")
}

// Signup Statics 
userSchema.statics.signup = async function (email, password){
    
    if(!email){
        throw Error("no email");
    }

    if(!password){
        throw Error("no password");
    }

    if(!validator.isEmail(email)){
        throw Error("invalid email");
    }
    
    if(!validator.isStrongPassword(password)){
        throw Error("weak password");
    }

    const user = await this.create({ email, password });
    return user;
}


const User = mongoose.model("user", userSchema);

module.exports = User;