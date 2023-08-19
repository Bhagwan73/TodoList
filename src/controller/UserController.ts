
import {User} from '../entity/User'
import {AppDataSource} from '../data-source'
import {hash,compare} from 'bcrypt'
import {sign} from 'jsonwebtoken'
import {body,validationResult} from 'express-validator'
import {Request,Response} from 'express'
// Get the User repository 
const userRepository=AppDataSource.getRepository(User)


// Register user
const registerUser=async (req:Request,res:Response)=>{
    try{
    // Check for validation errors
    await body('userName').notEmpty().isString().run(req);
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
     return res.status(400).send({ errors: errors.array() });
    }
     const data=req.body
     const {password,email}=data
    //  Check unique email
    const uniqueEmail=await userRepository.findOne({where:{'email':email}})
    if(uniqueEmail) return res.status(400).send({status:false ,message:'This email is already Registered'})
    // Hash the password using bcrypt with 10 rounds of salting
     data['password']=await hash(password,10)
     const user=userRepository.create(data)
     await userRepository.save(user)
     return res.status(201).send({status:false,message:"user created sucessfully" , 'user':user})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}


// Login user
const login=async (req:Request,res:Response)=>{
    try{
    // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
      const {email,password}=req.body
      const user= await userRepository.findOne({where:{'email':email}})
      if(!user) return res.status(400).send({status:false,message:"Email is not registered"})
      
      // Compare the provided password with hashed password
      const pass=await compare(password,user.password)
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

export {registerUser, login}