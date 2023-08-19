
const mongoose=require("mongoose")

const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        require:true
    }
},{timestamps:true})

module.exports=mongoose.model('Todo',todoSchema)

