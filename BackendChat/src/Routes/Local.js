const express=require("express")

const Local=express.Router()
Local.get("/a",(req,res)=>{
    res.send("jdsjfjhsdf")
})

Local.get("/d",(req,res)=>{
    res.send("jdsjfdsfsdfsadfasfasdfjhsdf")
})

module.exports=Local
