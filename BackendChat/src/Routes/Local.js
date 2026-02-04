const express=require("express")
const ModelDemo = require("../Models/ModelDemo")
const ModelUser = require("../Models/ModelUser")
const ModelGroup = require("../Models/ModelGroup")

const Local=express.Router()

Local.get("/getuser",async(req,res)=>{
    const data = await ModelUser.find({});
    res.send(data)
})


Local.post("/getgroup",async(req,res)=>{
    let {fromuserId}=req.body;
    fromuserId=fromuserId.fromuserId
//   console.log(fromuserId)
    const data = await ModelGroup.find({});
    // console.log(data[0].allId[0])
    const finaldata = data.filter((e) =>
  e.allId.some((t) => t.toString()===fromuserId)
);
    // console.log(finaldata)
    res.send(finaldata)
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


Local.post("/addgroup",async(req,res)=>{
    const {text,selected,fromuserId}=req.body
    const data=new ModelGroup({
        groupname:text,
        allId:selected,
        SenderId:fromuserId
    })
 await data.save()
    res.send(data)
})
module.exports=Local
