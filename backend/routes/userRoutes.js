const express = require("express")
const router = express.Router();
const userController = require("../controllers/userController")

// Login
router.post("/login", userController.login);


// Signup
router.post("/signup", userController.signup);


module.exports = router