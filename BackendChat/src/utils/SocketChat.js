const { Server } = require("socket.io")


const SocketChat =(Httpsever)=>{
    try{

const io = new Server(Httpsever, {
  cors: {
    origin: "http://localhost:5175",
  }
});

io.on("connection",(socket)=>{
// console.log(socket.id)

socket.on("joinchat",({fromuserId,touserId})=>{
    const room=[fromuserId,touserId].sort().join("_")
    // console.log(room)
    socket.join(room)
})

socket.on("send",({fromuserId,touserId,text})=>{
   const val=text;
    const room=[fromuserId,touserId].sort().join("_")
    //  console.log(room)
    io.to(room).emit("received",(val))
})



})

}
catch(err){console.log(err)}
}




module.exports=SocketChat