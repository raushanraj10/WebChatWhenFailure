import { useEffect, useState,useRef } from "react"
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
  const Fetchuser=async()=>{
    const recieved=await axios.post("http://localhost:5000/getgroupmessage",{groupId},{withCredentials:true})
    const user=await axios.post("http://localhost:5000/getgroupalluser",{groupId},{withCredentials:true})
        setallid(user?.data?.allId)
        setmessage(recieved?.data)
    }
    
const socketRef = useRef(null)

useEffect(() => {
  if (!socketRef.current) {
    socketRef.current = io("http://localhost:5000")
  }

  return () => {
    socketRef.current.disconnect()
    socketRef.current = null
  }
}, [])

    useEffect(()=>{
      if(allid.lenght===0)return;
      socketRef.current.emit("joingroup",({allid}))
    },[allid,groupId])

    useEffect(()=>{
      socketRef.current.on("recievedgroupmessage",({msg,fromId})=>{
        // setSenderId(fromId)
      if(fromuserId===fromId)return;
       setmessage(prev=>[...prev,{text:msg,SenderId:fromId}])
      })  
    },[])
    
    useEffect(()=>
        {Fetchuser() 
        }
    ,[groupId])


const HandleSend=()=>{
 socketRef.current.emit("sendgroupmessage",({text,fromuserId,allid,groupId}))
  //  setSenderId(fromuserId)
   setmessage(prev=>[...prev,{text,SenderId:fromuserId}])
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