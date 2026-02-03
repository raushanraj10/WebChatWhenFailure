import { useEffect } from "react"
import Connection from "../Connection"
import { useParams } from "react-router"
import { useState } from "react"
import { io } from "socket.io-client"

const SingleChat=()=>{
    const [text,settext]=useState("")
    const [sendtext,setsendtext]=useState([])
    const [receivetext,setreceivetext]=useState([])
    const {fromuserId,touserId,named}=useParams()
    const socket=io("http://localhost:5000");

useEffect(()=>{
    if(touserId==="12Na") return;
    
    socket.emit("joinchat",({fromuserId,touserId}))
},[fromuserId,touserId])

const HandleSend=()=>{
    sendtext.push(text)
    socket.emit("send",({fromuserId,touserId,text}));
    settext("");
}

useEffect(()=>{
    socket.on("received",(val)=>{
        console.log(val)
        receivetext.push(val)
        console.log(receivetext)
    })
  },[touserId,fromuserId])

 return (
 <>
  
    <div className="h-screen w-screen bg-blue-100 ">
          <div className="flex ">
    <div> <Connection/></div>
{touserId=="12Na"&&
<div className="text-7xl mx-96 text-center font-extrabold text-blue-900">Select User</div>
}
   {touserId!=="12Na"&& <div className="w-screen p-[5vw] h-[40vw]  overflow-scroll">

 {receivetext.map((e)=>{return(<div className="chat chat-start">
  <div className="chat-bubble">
    {e}
  </div>
</div>)})}

{sendtext.map((e)=>{return (<div className="chat chat-end">
  <div className="chat-bubble">{e}</div>
</div>)})}

    </div>}
</div>

 {touserId!=="12Na"&&<div className="flex justify-center">
    <input value={text} onChange={(e)=>(settext(e.target.value))} className=" bg-cyan-900  h-9 font-semibold rounded-b-lg w-lvh gap-4 bg-neutral-secondary-medium border border-default-medium" placeholder=".Type...."></input>
    <button onClick={()=>(HandleSend())} className="bg-sky-500 hover:bg-sky-700 w-20 rounded-2xl mx-3" placeholder="sdfasd">Send</button>
 </div>}
    </div>
    </>
 )
}
export default SingleChat