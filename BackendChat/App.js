const express =require("express")
const cors=require("cors")

const app=express()
app.use(express.json())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


const Local=require("./src/Routes/Local")
const Connectdb = require("./src/Constant/DataBase")

// app.use("/",(req,res)=>{
//     res.send("cons")
// })
app.use("/",Local)
Connectdb().then(()=>{app.listen(5000,()=>{console.log("Server Started")
    console.log("Database Connected Successfully")
})})
.catch(()=>{console.error("Not Connected")})
