import express from 'express'
import {AppDataSource} from './data-source'
import Routes from './routes/Router'
const app=express()
app.use(express.json())
import dotenv from 'dotenv' 
dotenv.config({path:"./.env"}) 

app.use("/",Routes)
AppDataSource.initialize()
.then(()=> console.log("PostgreSQL connection established successfully."))
.catch((err)=>console.log(err))

const port=process.env.PORT || 3000 ;
app.listen( port ,()=>{
    console.log(`Express running on port ${port}.`)
})

