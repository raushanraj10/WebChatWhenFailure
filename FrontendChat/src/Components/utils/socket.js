import { io } from "socket.io-client";

const Socketconnection=()=>{
return io("http://localhost:5000")}

export default Socketconnection