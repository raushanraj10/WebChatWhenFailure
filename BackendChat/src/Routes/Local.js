const express=require("express")
const ModelDemo = require("../Models/ModelDemo")
const ModelUser = require("../Models/ModelUser")

const Local=express.Router()
Local.post("/savemessage",async (req,res)=>{
    const {val,named,id}=req.body
   
    const news=new ModelDemo({text:val,})
    await news.save()
    res.send("Done")
})

Local.get("/getmessage",async(req,res)=>{
    const data = await ModelDemo.find({});
    res.send(data)
})
Local.get("/getuser",async(req,res)=>{
    const data = await ModelUser.find({});
    res.send(data)
})
module.exports=Local
