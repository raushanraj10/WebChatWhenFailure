const express =require("express")
const cors=require("cors")
const { createServer } = require("http") ;

const app=express()
app.use(express.json())

app.use(cors({
    origin:"http://localhost:5175",
    credentials:true
}))


const Local=require("./src/Routes/Local")
const Connectdb = require("./src/Constant/DataBase");
const SocketChat = require("./src/utils/SocketChat");

const Httpsever=createServer(app);


SocketChat(Httpsever)

app.use("/",Local)


Connectdb().then(()=>{Httpsever.listen(5000,()=>{console.log("Server Started")
    console.log("Database Connected Successfully")
})})
.catch(()=>{console.error("Not Connected")})
