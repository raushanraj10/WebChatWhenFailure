import { useEffect, useState } from "react"
import axios from "axios"
import Connection from "./Components/Connection"
import { useParams } from "react-router"
const Demo=()=> {
  const [val,setval]=useState("")
  const [text,settext]=useState([])
  const [receivetext,setreceivetext]=useState([])
  const {named,_id}=useParams()

  const Fetchdata=async()=>{
    const res=await axios.get("http://localhost:5000/getmessage",{withCredentials:true})
    setreceivetext(res.data)
  
  }

  useEffect(()=>{
    Fetchdata()
  },[])

  const handlesend=async ()=>{
   text.push(val)
  await axios.post("http://localhost:5000/savemessage",{val,named,_id},{withCredentials:true}) 
   setval("");
  }
  return (
    <>
    <div className="text-6xl text-center">Hii faliure Insaan</div>
    <div className="flex">
      
    <div className="m-14">
    <Connection/>
    </div>   
    <div className="  w-screen bg-white text-white p-4 m-8 ">
     <div className="text-center text-3xl text-black">{named}</div>
     <div className="chat chat-start">
  <div className="chat-bubble bg-gray-700">
  {receivetext.map((e)=>(<div>{e.text}  <br /></div>))}
 
  </div>
</div>
<div className="chat chat-end">
  <div className="chat-bubble p-10 bg-green-700">{text.map((e)=>(<div>{e}  <br /></div>))}</div>
</div>
    
     <div className="flex justify-center gap-3">
      <input   value={val}  onChange={(u)=>setval(u.target.value)}  className=" text-white bg-gray-700 w-md rounded-3xl" type="text" placeholder=" Type"></input>
      <button onClick={handlesend}  className="px-2 rounded-3xl bg-blue-600"> send</button>
      
     </div>
     </div>
     </div>
    </>
  )
}

export default Demo
