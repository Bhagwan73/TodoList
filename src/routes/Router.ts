
import express from 'express';
const router = express.Router();
import {createTodo , getTodos ,getTodoById, updateTodo, deleteTodo} from '../controller/TodoController'
import {registerUser,login} from '../controller/UserController'
import {
    validateQuery,
    validateCreateRequestBody,
    validateUpdateRequestBody,
    validateUser
} from '../middleware/validateData'
import {authentication} from '../middleware/auth'

// User routes
router.post("/register",validateUser,registerUser)
router.post('/login',validateUser,login)

// Todo routes
router.post('/todo',authentication,validateCreateRequestBody,createTodo)
router.get("/todos",authentication, validateQuery ,getTodos)
router.get("/todos/:id",authentication,getTodoById)
router.put('/todos/:id',authentication,validateUpdateRequestBody,updateTodo)
router.delete('/todos/:id',authentication,deleteTodo)

export default router;