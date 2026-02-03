import { use, useEffect } from "react"
import Connection from "../Connection"
import { useParams } from "react-router"
import { useState } from "react"
import { io } from "socket.io-client"
import axios from "axios"

const SingleChat=()=>{
    const [text,settext]=useState("")
    const [sendtext,setsendtext]=useState([])
    const [receivetext,setreceivetext]=useState([])
    const [message,setmessage]=useState([])
    const {fromuserId,touserId,named}=useParams()
    const socket=io("http://localhost:5000");

 const FetchPrivatedata=async()=>{
    if(touserId==="12Na")return;
    const sendedres=await axios.post("http://localhost:5000/privatemessage",{fromuserId,touserId},{withCredentials:true})
    setmessage(sendedres.data)
    console.log(message)
  }

useEffect(()=>{
    if(touserId==="12Na") return;
    socket.emit("joinchat",({fromuserId,touserId}))
},[touserId])

const HandleSend=()=>{
       setmessage(prev => [...prev, {text,SenderId:fromuserId}])
    socket.emit("send",({fromuserId,touserId,text}));
    settext("");
}

useEffect(()=>{
    FetchPrivatedata()
    setsendtext([])
    setreceivetext([])
    setmessage([])
    console.log("vchc")
},[touserId])


useEffect(()=>{
    socket.on("received",({val,SenderId})=>{
        if(SenderId===fromuserId)return;
        // console.log(val)
       setmessage(prev => [...prev, {text:val,SenderId}])
        console.log(receivetext)
    })
  },[touserId])

 return (
 <>
  
    <div className="h-screen w-screen bg-blue-100 ">
          <div className="flex ">
    <div> <Connection/></div>
{touserId=="12Na"&&
<div className="text-7xl mx-96 text-center font-extrabold text-blue-900">Select User</div>
}
   {touserId!=="12Na"&& <div className="w-screen p-[5vh] h-[40vw]  overflow-scroll">
 

{message.map((msg, i) => (
  <div
    key={i}
    className={`chat ${
      msg.SenderId === fromuserId ? "chat-end" : "chat-start"
    }`}
  >
    <div
      className={`chat-bubble ${
        msg.SenderId === fromuserId
          ? "bg-green-500 text-white"
          : "bg-gray-400 text-black"
      }`}
    >
      {msg.text}
    </div>
  </div>
))}


    </div>}
</div>

 {touserId!=="12Na"&&<div className="flex justify-center">
    <input value={text} onChange={(e)=>settext(e.target.value)} className=" bg-cyan-900  h-9 font-semibold rounded-b-lg w-lvh gap-4 bg-neutral-secondary-medium border border-default-medium" placeholder=".Type...."></input>
    <button onClick={HandleSend} className="bg-sky-500 hover:bg-sky-700 w-20 rounded-2xl mx-3" placeholder="sdfasd">Send</button>
 </div>}
    </div>
    </>
 )
}
export default SingleChat