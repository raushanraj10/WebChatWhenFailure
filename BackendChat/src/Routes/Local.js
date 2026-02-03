const express=require("express")
const ModelDemo = require("../Models/ModelDemo")
const ModelUser = require("../Models/ModelUser")

const Local=express.Router()
Local.post("/savemessage",async (req,res)=>{
    const {touserId,named,fromuserId,val}=req.body
  
    const news=new ModelDemo(
        {text:val,fromuserId,touserId,name:named})
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

Local.post("/privatemessagesend",async(req,res)=>{
    const {fromuserId,touserId}=req.body
    const data=await ModelDemo.find({fromuserId,touserId})
    res.send(data)
})



Local.post("/privatemessagereceived",async(req,res)=>{
    const {fromuserId,touserId}=req.body
    const data=await ModelDemo.find({fromuserId:touserId,touserId:fromuserId})
    res.send(data)
})
module.exports=Local
