
import dotenv from 'dotenv' 
dotenv.config({path:"./.env"}) 
import {verify} from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';


// authentication
const authentication=(req: Request, res: Response, next: NextFunction)=>{
    try{
        let token=req.headers.authorization
        if (!token || typeof token !== "string") return res.status(400).send({ status: false, message:'Authorization token is missing.' });
         token=token.split(" ")[1]  // Remove the "Bearer" word from token
        // Verify the token using the SECRET_KEY 
        verify(token,process.env.SECRET_KEY ,(err,decodedToken)=>{
            if(err)  return res.status(401).send({ status: false, message: err.message});
        //  provide interface of paylod object to  typescript
            interface payload{
                 userId:number
            }
            const userId=(decodedToken as payload ).userId
            req["user_id"]=userId  // set userId in the request object 
            next()
        })
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

export {authentication}