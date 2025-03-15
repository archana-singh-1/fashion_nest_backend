import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import mongoose from 'mongoose';
import route from './routes/productRoute.js';
import authRoutes from './routes/authRoutes.js'


const app=express()
app.use(cors())
dotenv.config();
app.use(express.json())


const PORT=process.env.PORT
const mongoDbUrl = process.env.mongoDb;


mongoose.connect(mongoDbUrl,{
    dbName: "b_net",  
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/",(req,res)=>{
    console.log("Done")
})

app.use("/api/auth", authRoutes);
app.use("/api/products",route)

app.listen(PORT,function(){
    console.log(`Server is running on Port ${PORT}`)
})

