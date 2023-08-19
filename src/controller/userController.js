const {validationResult,body}=require("express-validator");
const userModel= require("../models/userModel");
const {hash,compareSync}=require("bcrypt")
const { sign } = require("jsonwebtoken");

exports.registerUser=async(req,res)=>{
    try{
    //  Check for validation errors
    await body('userName').notEmpty().isString().run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
   }
    const data=req.body
    const {password,email}=data
    // check unique email
    const uniqueEmail=await userModel.findOne({email:email})
    if(uniqueEmail) return res.status(400).send({status:false ,message:'This email is already Registered'})
    // Hash the password using bcrypt with 10 rounds of salting
     data['password']= await hash(password,10)
     const user=await userModel.create(data) 
     return res.status(201).send({status:false,message:"user created sucessfully" , 'user':user})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

exports.login=async (req,res)=>{
    try{
        // Check for validation errors
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }
          const {email,password}=req.body
          const user= await userModel.findOne({email:email})
          if(!user) return res.status(400).send({status:false,message:"Email is not registered"})
          
          // Compare the provided password with hashed password
          const pass=compareSync(password,user.password)
          if(!pass) return res.status(401).send({ status: false, message: "Invalid password" });
          
          // Generate a JWT token and include it in the response header
           sign({userId:user.id},process.env.SECRET_KEY ,{expiresIn:'1h'} ,(err,token)=>{
              if(err) return res.status(400).send({status:false,message:err.message})
              res.header('Authorization', `Bearer ${token}`);
              return res.status(200).send({ status: true, message: 'User login success'});
          })
        }catch(err){
            return res.status(500).send({status:false,message:err.message})
        }
}