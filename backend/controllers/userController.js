const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Handle Errors
const handleErrors = (err)=> {
    let errors = { email: "", password: "" };
    
    if(err.message.includes("user validation failed")){
        Object.values(err.errors).forEach(({properties})=> {
            errors[properties.path] = properties.message;
        })
    }
    // login errors
    if(err.message === "no email"){
        errors.email = "Please enter an email."
        return errors
    }

    if(err.message === "no password"){
        errors.password = "Please enter a password."
        return errors
    }

    if(err.code === 11000){
        errors.email = "Email already registered."
        return errors
    }

    if(err.message === "incorrect password"){
        errors.password = "Password is incorrect."
    }

    if(err.message === "incorrect email"){
        errors.email = "Email is not registered."
    }

    if(err.message === "weak password"){
        errors.password = "Please enter a strong password."
    }

    if(err.message === "invalid email"){
        errors.email = "Please enter a valid email."
    }

    return errors
}

// Create token
const maxage = 2 * 60 * 60 * 24;
const createToken = (id)=> {
    return jwt.sign({id}, process.env.JWTSECRET, {expiresIn: maxage})
}

// login
const login = async (req, res)=> {
    const { email, password } = req.body;
    
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({email, token});

    } catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
        }
}

// Signup
const signup = async (req, res)=> {
    const { email, password } = req.body;
    try {
        const user = await User.signup(email, password);
        const token = createToken(user._id);
        res.status(200).json({email, token});

    } catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
        }
}

module.exports = {
    login,
    signup
}