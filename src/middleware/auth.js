
require("dotenv").config({path:".env"})
const {verify}=require("jsonwebtoken")

// authentication
exports.authentication=(req, res , next)=>{
    try{
        let token=req.headers.authorization
        if (!token || typeof token !== "string") return res.status(400).send({ status: false, message:'Authorization token is missing.' });
         token=token.split(" ")[1]  // Remove the "Bearer" word from token
        // Verify the token using the SECRET_KEY 
        verify(token,process.env.SECRET_KEY ,(err,decodedToken)=>{
            if(err)  return res.status(401).send({ status: false, message: err.message});
            const userId=decodedToken.userId
            req["user_id"]=userId  // set userId in the request object 
            next()
        })
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

