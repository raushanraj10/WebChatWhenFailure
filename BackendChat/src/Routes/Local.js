const express=require("express")
const ModelDemo = require("../Models/ModelDemo")
const ModelUser = require("../Models/ModelUser")

const Local=express.Router()

Local.get("/getuser",async(req,res)=>{
    const data = await ModelUser.find({});
    res.send(data)
})

Local.post("/privatemessage",async(req,res)=>{
    const {fromuserId,touserId}=req.body
    const SenderId=fromuserId
    const data=await ModelDemo.find({
        $or:[{SenderId:touserId,touserId:SenderId},
            {SenderId,touserId}
        ]})
    res.send(data)
})
module.exports=Local
