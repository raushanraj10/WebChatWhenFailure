import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { io } from "socket.io-client"

const AllGroupConnection=()=>{

  
        const [groupName,setgroupName]=useState([])
        const Navigate=useNavigate()
       const fromuserId=useParams()
       const fromId=fromuserId.fromuserId
    

     const Fetchuser=async()=>{
        const res=await axios.post("http://localhost:5000/getgroup",{fromuserId},{withCredentials:true})
           setgroupName(res.data)
    }
    
    
    useEffect(()=>
        {Fetchuser() 
        }
    ,[])

  const HandleGroup=(id)=>{
    // console.log(id)
    return Navigate(`/groupchat/${fromId}/${id.id}`)
   }

    return (
        <>
          <div className=" border-4 w-60 h-auto rounded-4xl bg-blue-900">
            {groupName.map((e)=>{
            return(
                <>
                <button onClick={()=>HandleGroup({id:e._id,name:e.groupname})} className="m-6 text-2xl text-balance">{e.groupname}</button>  
                </>
            )
        })}</div>
      
        </>
        
    )

        
   
}
export default AllGroupConnection