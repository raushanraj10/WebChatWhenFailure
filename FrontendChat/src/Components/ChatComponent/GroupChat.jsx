import { useEffect, useState } from "react"
import AllGroupConnection from "./AllGroupConnection"
import { useParams } from "react-router"
import axios from "axios"
import { io } from "socket.io-client"

const GroupChat=()=>{
  const [text,settext]=useState("")
const [message,setmessage]=useState([])
const [allid,setallid]=useState([])
const [SenderId, setSenderId]=useState("")
const {fromuserId,groupId}=useParams()
  const socket=io("http://localhost:5000")
  const Fetchuser=async()=>{
        const res=await axios.post("http://localhost:5000/getgroupalluser",{groupId},{withCredentials:true})
        setallid(res.data.allId)
    }
    

    useEffect(()=>{
      if(allid.lenght<1)return;
      socket.emit("joingroup",({allid}))
    },[allid])

    useEffect(()=>{
      socket.on("recievedgroupmessage",({msg,fromId})=>{
        setSenderId(fromId)
      
       setmessage(prev=>[...prev,{text:msg,fromuserId:fromId}])
      })
     
    },[])
    
    useEffect(()=>
        {Fetchuser() 
        }
    ,[groupId])


const HandleSend=()=>{
  socket.emit("sendgroupmessage",({text,fromuserId,allid}))
   setmessage(prev=>[...prev,{text,fromuserId}])
  settext("")
}

 return (
  <div >
  <div className="  bg-amber-50  w-screen">
    <div className="flex">
    <AllGroupConnection/>
    <div className=" w-screen h-screen m-10 p-4 ">

     {message.map((msg, i) => (
  <div
    key={i}
    className={`chat ${
      msg.fromuserId === fromuserId ? "chat-end" : "chat-start"
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


    </div>
  </div>
  <div className=" flex-col-reverse gap-5 justify-center text-center">
  <input value={text} onChange={(e)=>settext(e.target.value)} className="bg-blue-700 w-96 rounded-xl"></input>
  <button onClick={()=>{HandleSend()}} className="bg-sky-500 hover:bg-sky-700 w-20 rounded-xl">Send</button>
  </div>
  </div>
  

  </div>
 )
}
export default GroupChat