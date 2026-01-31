const express =require("express")

const app=express()
const Local=require("./src/Routes/Local")

// app.use("/",(req,res)=>{
//     res.send("cons")
// })
app.use("/",Local)
app.listen(5000,()=>{console.log("Server Started")})