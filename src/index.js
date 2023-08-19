
const express=require("express")
const mongoose=require("mongoose")
const route=require("./route/router")
const app=express()
app.use(express.json())
require("dotenv").config({path:'.env'})

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("mongoose is connected"))
.catch((err)=>console.log(err))

app.use("/",route)
const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Express running on port ${PORT}`)
})
