
const { validationResult}=require('express-validator');
const todoModel =require("../models/todoModel");

// Create a new todo item
exports.createTodo = async (req,res) => {
  try {
    // Express Validator to validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
       return res.status(400).send({ errors: errors.array() });
     }
    // Create and save the new todo object in the database
    const newTask = await todoModel.create(req.body);
    res.status(201).send({ status: true, message:'Todo item created successfully.',data: newTask });
}catch(err){
    return res.status(500).send({status:false,message:err.message})
}
};


// Retrieve a list of all Todo items
exports.getTodos= async (req,res) =>{
    try{
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    // Get the requested page number and limit or set default.
      let page=req.query.pageNumber ? req.query.pageNumber : 1
      const limit=req.query.limit ? req.query.limit : 10;
     
     // Get the total count of todo items in the database & Calculate the total number of pages
      const todoCount = await todoModel.countDocuments();
      const totalPages=Math.ceil(todoCount/limit)
      
      if (page > totalPages ) page=totalPages;
      const skip= (page-1)*limit 
      const status=req.query.status
      const order=req.query.order=='ascending' ? 1 : -1
      let tasks;
    if(status) {
       tasks= await todoModel.find({'status':status}).skip(skip).limit(limit).sort({createdAt:order})
    }else{
       tasks= await todoModel.find().skip(skip).limit(limit).sort({createdAt:order})
    }
      if(tasks.length==0) return res.status(404).send({status: true,message: 'No tasks found'})
      return res.status(200).send({status:true,data:tasks})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}


// Retrieve a specific Todo item by ID
exports.getTodoById = async (req,res)=>{
    try{
    // Get the task ID from the URL parameter
      const taskId =req.params.id;
      if(!taskId) return res.status(400).send({status:false , message:'taskId must be in number'})
      const task= await todoModel.findById({_id:taskId})
      if(!task) return res.status(404).send({ status: false, message:'Task not found.'});
      return res.status(200).send({status:true , 'task':task})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}


// Update an existing todo item
exports.updateTodo= async (req,res)=>{
    try{
    // Check for validation errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
     return res.status(400).send({ errors: errors.array() });
    }
    const taskId =req.params.id
    if(!taskId) return res.status(400).send({status:false , message:'taskId must be in number'})
    
     // If task is not found, return a 404 status with a message
     const task= await todoModel.findById(taskId)
     if(!task) return res.status(404).send({ status: false, message:'Task not found.'});

     const updatedTask=await todoModel.findOneAndUpdate({_id:taskId},{$set:req.body},{new:true})
     return res.status(200).send({status:true,message:'Todo item updated successfully.','updatedTask':updatedTask})
     }catch(err){
        return res.status(500).send({status:false,message:err.message})
     }
}


// Delete a Todo item
exports.deleteTodo=async (req,res)=>{
 try{
    const taskId = req.params.id
    if(!taskId) return res.status(400).send({status:false , message:'taskId must be in number'})

    // If task is not found, return a 404 status with a message
    const task= await todoModel.findById(taskId)
    if(!task) return res.status(404).send({ status: false, message:'Task not found.'});
    const deletedTodo=await todoModel.findByIdAndDelete(taskId)
    return res.status(200).send({status:true,messgae:'Todo item deleted successfully.' , todo:deletedTodo})
 }catch(err){
    return res.status(500).send({status:false,message:err.message})
 }
}


