require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes")
const todoRoutes = require("./routes/todoRoutes")
const cors = require("cors");


const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next)=> {
    console.log(req.url, req.method)
    next();
})

// Cors
app.use(cors({
    origin: "http://localhost:3000/",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
}))

// Mongoose connection
const PORT = process.env.PORT || 4000
mongoose.connect(process.env.MONGO_URI)
.then((result)=> {
    app.listen(PORT, ()=> {
        console.log(`Connected and listening on port ${process.env.PORT}`)
    }) 
}) .catch((err)=> {
    console.log(err);
})

// todo routes
app.use('/todos', todoRoutes)

// user routes
app.use("/user", userRoutes)