
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
// const cors=require('cors')
const dotenv=require('dotenv')
const router = require('./Routers/userRouter')
const filerouter = require('./Routers/fileRouter')

dotenv.config()
const app=express()

const corsOptions={
    origin:'http://localhost:3000',
    methods:"GET,POST,PUT,DELETE,PATCH",
    Credential:true
  }
  app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/',router)
app.use('/',filerouter)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected successfully");
}).catch((err)=>console.log(err))

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})