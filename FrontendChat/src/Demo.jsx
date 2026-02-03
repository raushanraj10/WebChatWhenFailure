import { useEffect, useState } from "react"
import axios from "axios"
import Connection from "./Components/Connection"
import { useParams } from "react-router"
import Socketconnection from "./Components/utils/socket"
const Demo=()=> {
  const [val,setval]=useState("")
  const [val1,setval1]=useState("")
  const [text,settext]=useState([])
  const [receivetext,setreceivetext]=useState([])
   const [sendedtext,setsendedtext]=useState([])

  const {named,fromuserId,touserId}=useParams()

  const FetchPrivatedata=async()=>{
    if(touserId==="12Na")return;
    const sendedres=await axios.post("http://localhost:5000/privatemessagesend",{fromuserId,touserId},{withCredentials:true})
    const receivedres=await axios.post("http://localhost:5000/privatemessagereceived",{fromuserId,touserId},{withCredentials:true})
    setsendedtext(sendedres.data)
    setreceivetext(receivedres.data)
  }
 
  useEffect(()=>{
   const socket = Socketconnection()
   socket.on("received",(msg)=>{
     const obj={text:msg}
     setval1(msg)
     console.log(msg)
      console.log(val1)
     receivetext.push(msg)
   })

  //  console.log(receivetext+text)
  },[receivetext,val1])

useEffect(()=>{
  const socket=Socketconnection()
  socket.emit("joinchat",({fromuserId,touserId}))
},[touserId,fromuserId])


  useEffect(()=>{
   FetchPrivatedata()
  },[touserId])

  const handlesend=async ()=>{

    const socket=Socketconnection()
    socket.emit("send",({fromuserId,touserId,val}))
     text.push(val)
  
   if(touserId=="12Na") return;
   await axios.post("http://localhost:5000/savemessage",{val,touserId,named,fromuserId},{withCredentials:true}) 
   setval("");
  }
  return (
    <>
    <div className="text-6xl text-center">Hii faliure Insaan</div>
    <div className="flex">
      
    <div className="my-60 ">
    <Connection  className="" />
    </div>   
    <div className="  overflow-scroll w-screen h-96 bg-white text-white p-4 m-8 ">
     {touserId!=="12Na"&&<div className="text-center text-3xl bg-amber-950 m-6 rounded-3xl text-amber-300">{named}</div>}

  {receivetext.map((e)=>{
    return(
   <>
   <div className="chat chat-start">
  <div className="chat-bubble bg-gray-700">{e.text}{val1}
  </div>
  </div>
  </>
   ) })}



{sendedtext.map((e)=>{return(
<div className="chat chat-end">
  <div className="chat-bubble  bg-green-700">{e.text}</div>
</div>  
)})}

{text.map((e)=>{return(
<div className="chat chat-end">
  <div className="chat-bubble  bg-green-700">{e}</div>
</div>  
)})}

     
     </div>
 
    

     </div>
      <div className="text-center ">
      <input   value={val}  onChange={(u)=>setval(u.target.value)}  className=" text-white bg-gray-700 w-md h-9 rounded-3xl m-7" type="text" placeholder=""></input>
      <button onClick={handlesend}  className="px-2 rounded-3xl h-8 w-20 bg-blue-600"> Send</button>
     </div>
    </>
  )
}

export default Demo
