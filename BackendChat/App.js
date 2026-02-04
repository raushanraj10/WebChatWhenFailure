const express =require("express")
const cors=require("cors")
const { createServer } = require("http") ;
require('@dotenvx/dotenvx').config()
const app=express()
app.use(express.json())


const alloworigin=[process.env.BASE_URL1,process.env.BASE_URL2,process.env.BASE_URL3,process.env.BASE_URL4,process.env.BASE_URL5]
app.use(cors({
  origin: function (origin, callback) {
    // allow server-to-server / postman
    if (!origin) return callback(null, true)

    if (alloworigin.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
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
