import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

const Connection=()=>{
       const [user,setuser]=useState([])
       const Navigate=useNavigate()
       const [Selecteduser,setSelecteduser]=useState(null)
        const [finaluser,setfinaluser]=useState([])
        const getId=useParams()
     const Fetchuser=async()=>{
        const res=await axios.get("http://localhost:5000/getuser",{withCredentials:true})
        setuser(res.data)      
    }
    const Handleuser=(props)=>{
         return Navigate(`/a/${props.name}/${props.id}`)
    }
    useEffect(()=>
        {
            if(user.length===0)return;
            setfinaluser(user.filter((e)=>(e._id!==getId._id))) 
        }
    ,[user])
    useEffect(()=>
        {Fetchuser()  
        }
    ,[])
    return ((finaluser.length!==0&&
        <div className="border-8 w-60  bg-blue-950">{finaluser.map((e)=>{
            return(
                <button onClick={()=>Handleuser({id:e._id,name:e.name})} className="m-6 text-2xl ">{e.name}</button>  
            )
        })}</div>)
    )
}
export default Connection