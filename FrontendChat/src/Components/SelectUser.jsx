import axios from "axios"
import { useEffect, useState } from "react"
import CardShimmer from "./CardShimmer"
import { useNavigate } from "react-router"

const SelectUser=()=>{
    const [user,setuser]=useState([])
    const navigate=useNavigate()
    const handleclick=async(e)=>{
      return navigate(`/a/named named/${e}`)
    }
    
    const Fetchuser=async()=>{
        const res=await axios.get("http://localhost:5000/getuser",{withCredentials:true})
        setuser(res.data)
    }
    useEffect(()=>
        {Fetchuser()}
    ,[])
    if(user.length===0) return (<div><CardShimmer/></div>)
return (
    <div className="flex justify-center ">
    {user.map((e)=>{return (
     <div className="card bg-base-100 w-96 shadow-sm">
  <figure className="px-10 pt-10">
    <img 
      src={e.photo}
      alt="Shoes"
      className="rounded-xl w-72 h-96" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{e.name}</h2>
    <p>{e.gender}</p>
    <div className="card-actions">
      <button onClick={()=>handleclick(e._id)}  className="btn btn-primary">Start Chat</button>
    </div>
  </div>
</div>)})}

</div>
)
}

export default SelectUser