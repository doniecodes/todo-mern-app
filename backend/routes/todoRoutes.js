const express = require("express");
const router = express.Router();
const { getAllTodos, createTodo, deleteTodo, updateTodo } = require("../controllers/todoController");
const authRequired = require("../middlewares/authRequired");

router.use(authRequired);

// Home, All Todos
router.get("/", getAllTodos);

// Create todo
router.post("/", createTodo);

// Delete todo
router.delete("/:id", deleteTodo);

// Update todo
router.patch("/:id", updateTodo);

module.exports = router;