import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import mongoose from 'mongoose';
import route from './routes/productRoute.js';


const app=express()
app.use(cors())
app.use(express.json())


dotenv.config();
const PORT=process.env.PORT
const mongoDbUrl=process.env.mongoDb

mongoose.connect(mongoDbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/",(req,res)=>{
    console.log("Done")
})


app.use("/api/products",route)

app.listen(PORT,function(){
    console.log(`Server is running on Port ${PORT}`)
})