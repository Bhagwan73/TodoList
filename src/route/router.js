
const express=require("express")
const router=express.Router()

const {createTodo , getTodos ,getTodoById, updateTodo, deleteTodo}=require("../controller/todoController")
const {registerUser,login} =require("../controller/userController")
const {
    validateQuery,
    validateCreateRequestBody,
    validateUpdateRequestBody,
    validateUser
}=require('../middleware/validateData')
const {authentication} =require("../middleware/auth")

// User routes
router.post("/register",validateUser,registerUser)
router.post('/login',validateUser,login)

// Todo routes
router.post('/todo',authentication,validateCreateRequestBody,createTodo)
router.get("/todos",authentication, validateQuery ,getTodos)
router.get("/todos/:id",authentication,getTodoById)
router.put('/todos/:id',authentication,validateUpdateRequestBody,updateTodo)
router.delete('/todos/:id',authentication,deleteTodo)

module.exports=router