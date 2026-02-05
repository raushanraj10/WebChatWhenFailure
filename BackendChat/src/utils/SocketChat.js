const { Server } = require("socket.io");
const ModelDemo = require("../Models/ModelDemo");
const ModelGroupMessage = require("../Models/ModelGroupMessage");
require('@dotenvx/dotenvx').config()

const alloworigin=[process.env.BASE_URL1,process.env.BASE_URL2,process.env.BASE_URL3,process.env.BASE_URL4,process.env.BASE_URL5]

const SocketChat =(Httpsever)=>{
    try{

const io = new Server(Httpsever, {
  cors: {
    origin:alloworigin,
  }
});

io.on("connection",(socket)=>{
// console.log(socket.id)

socket.on("joinchat",({fromuserId,touserId})=>{
    const room=[fromuserId,touserId].sort().join("_")
    // console.log(room)
    socket.join(room)
})

socket.on("send",async({fromuserId,touserId,text})=>{
   const val=text;
    const news=new ModelDemo(
        {text,SenderId:fromuserId,touserId})
    await news.save()
   
   const SenderId=fromuserId
    const room=[fromuserId,touserId].sort().join("_")
    //  console.log(room)
    io.to(room).emit("received",({val,SenderId}))
})

socket.on("joingroup", ({ allid }) => {
  const room = [...allid].sort().join("_")
  socket.join(room)
//   console.log("JOINED ROOMS:", socket.rooms)
})


socket.on("sendgroupmessage",async ({allid,text,fromuserId,groupId})=>{
        const room = [...allid].sort().join("_")
     const msg=text;
     const fromId=fromuserId
        // console.log(socket.rooms)
        const data=ModelGroupMessage({
            text,SenderId:fromuserId,groupId
        })
        await data.save()
     io.to(room).emit("recievedgroupmessage",({msg,fromId}))
})


})

}
catch(err){console.log(err)}
}




module.exports=SocketChat