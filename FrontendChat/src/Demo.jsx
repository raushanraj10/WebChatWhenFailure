import { useEffect, useState } from "react"
import axios from "axios"
const Demo=()=> {
  const [val,setval]=useState("")
  const [text,settext]=useState([])
  const [receivetext,setreceivetext]=useState([])


  const Fetchdata=async()=>{
    const res=await axios.get("http://localhost:5000/getmessage",{withCredentials:true})
    setreceivetext(res.data)
    console.log(res.data)
  
  }

  useEffect(()=>{
    Fetchdata()
  },[])

  const handlesend=async ()=>{
   text.push(val)
  await axios.post("http://localhost:5000/savemessage",{val},{withCredentials:true}) 
   setval("");
  }
  return (
    <>
    <div className="">
     <div className="text-6xl text-center">Hii faliure Insaan</div>
     <div className="chat chat-start">
  <div className="chat-bubble">
  {receivetext.map((e)=>(<div>{e.text}  <br /></div>))}
  df
  </div>
</div>
<div className="chat chat-end">
  <div className="chat-bubble p-10">{text.map((e)=>(<div>{e}  <br /></div>))}</div>
</div>
    
     <div>
      <input  className="bottom-full" value={val}  onChange={(u)=>setval(u.target.value)}  className="border-2" type="text" placeholder="type"></input>
      <button onClick={handlesend}  className="px-2"> send</button>
      
     </div>
     </div>
    </>
  )
}

export default Demo
