
import {AppDataSource} from '../data-source'
import { Todo } from '../entity/Todo';
import {Request,Response} from 'express'
import { validationResult} from 'express-validator';
// Get the Todo repository instance from TypeORM
const todoRepository =AppDataSource.getRepository(Todo);


// Create a new todo item
const createTodo = async (req:Request, res:Response) => {
  try {
    // Express Validator to validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
       return res.status(400).send({ errors: errors.array() });
     }
    // Create and save the new todo object in the database
    const newTask = todoRepository.create(req.body);
    await todoRepository.save(newTask); 
    res.status(201).send({ status: true, message:'Todo item created successfully.',data: newTask });
}catch(err){
    return res.status(500).send({status:false,message:err.message})
}
};



// Retrieve a list of all Todo items
const getTodos=async  (req:Request, res:Response) =>{
    try{
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    // Get the requested page number and limit or set default.
      let page=req.query.pageNumber ? req.query.pageNumber : 1
      const limit=(req.query.limit && typeof req.query.limit === 'number') ? req.query.limit : 10;
     
     // Get the total count of todo items in the database & Calculate the total number of pages
      const todoCount = await todoRepository.count();
      const totalPages=Math.ceil(todoCount/limit)

      if (typeof page === 'number' && typeof totalPages === 'number' && page > totalPages ) 
      page=totalPages;
      const skip=(typeof page === 'number' && typeof limit === 'number') ? (page-1)*limit : 0 ;

    // sort tasks (ASCending or DESCending) based on created_at .
      const order=req.query.order === "ascending" ? 'ASC' : 'DESC';
    
    // filter tasks based on status.
      const filter=req.query.status ? {status:true} :{}

     let tasks= await todoRepository.find({
        take: limit,
        skip: skip,
        where:filter,
        order: { created_at: order },
      });

      if(tasks.length==0) return res.status(404).send({status: true,message: 'No tasks found'})
      return res.status(200).send({status:true,data:tasks})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}



// Retrieve a specific Todo item by ID
const getTodoById =async (req:Request,res:Response)=>{
    try{
    // Get the task ID from the URL parameter
      const taskId = parseInt(req.params.id, 10);
      if(!taskId) return res.status(400).send({status:false , message:'taskId must be in number'})
      const task= await todoRepository.findOne({where:{id:taskId}})
      if(!task) return res.status(404).send({ status: false, message:'Task not found.'});
      return res.status(200).send({status:true , 'task':task})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}



// Update an existing todo item
const updateTodo=async (req:Request,res:Response)=>{
    try{
    // Check for validation errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
     return res.status(400).send({ errors: errors.array() });
    }
    const {title,description,status}=req.body
    const taskId = parseInt(req.params.id, 10);
    if(!taskId) return res.status(400).send({status:false , message:'taskId must be in number'})
    
     // If task is not found, return a 404 status with a message
     const task=await todoRepository.findOne({where:{id:taskId}})
     if(!task) return res.status(404).send({ status: false, message:'Task not found.'});

     // Update task properties if new values are provided, otherwise keep the existing values
     task.title=title ? title :task.title;
     task.description=description ? description : task.description;
     task.status=(status===true || status===false ) ? status : task.status;

     // Save the updated task in the database
     const updatedTask=await todoRepository.save(task);
     return res.status(200).send({status:true,message:'Todo item updated successfully.','updatedTask':updatedTask})
     }catch(err){
        return res.status(500).send({status:false,message:err.message})
     }
}



// Delete a Todo item
const deleteTodo=async (req:Request,res:Response)=>{
 try{
    const taskId = parseInt(req.params.id, 10);
    if(!taskId) return res.status(400).send({status:false , message:'taskId must be in number'})
    const task=await todoRepository.findOne({where:{id:taskId}})
    if(!task) return res.status(404).send({ status: false, message:'Task not found.'});
    await todoRepository.remove(task)
    return res.status(200).send({status:true,messgae:'Todo item deleted successfully.'})
 }catch(err){
    return res.status(500).send({status:false,message:err.message})
 }
}

export { createTodo, getTodos, getTodoById, updateTodo, deleteTodo};
