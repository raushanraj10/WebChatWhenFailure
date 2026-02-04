import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

const AddGroup=()=>{
const [user,setuser]=useState([])
const [text,settext]=useState([])
const [selected, setSelected] = useState([])
const {fromuserId}=useParams()
 const Navigate=useNavigate()
const Fetchuser=async()=>{
        const res=await axios.get("http://localhost:5000/getuser",{withCredentials:true})
        setuser(res.data.filter((e)=>(e._id!==fromuserId)))  
    }
useEffect(()=>
{Fetchuser() 
      }
,[fromuserId])

const handleclick=async()=>{
 selected.push(fromuserId);
 console.log(text)
 const res=await axios.post("http://localhost:5000/addgroup",{text,selected,fromuserId},{withCredentials:true})
console.log(res)
 return Navigate(`/groupinfo/${fromuserId}`)
}

const HandleId = (e) => {
  const {value,checked}=e.target
 if(checked)
  setSelected(prev=>[...prev,value])
else
  setSelected(selected.filter((e)=>e!==value))  
}

// console.log(selected)

 return (
   <div className="bg-white h-screen w-screen m-6">
   <div className="text-black text-4xl font-serif">Add New Group</div>
   
   <lable className="text-black text-4xl font-serif">Name:<input value={text}  onChange={(e)=>settext(e.target.value)} className="bg-amber-100 mx-5" placeholder="Name of group"></input></lable>
   <br></br>
   {user.map((e)=>{return (<label className="text-black text-4xl font-serif">{e.name}:<input
  type="checkbox"
  value={e._id}
  onChange={HandleId}
  className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
/><br></br></label>)})}
 <button onClick={()=>{handleclick()}}  type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Create Group</button>

   </div>
    
 )
}
export default AddGroup