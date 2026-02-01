const mongoose=require("mongoose")

const Connectdb=async()=>{ 
await mongoose.connect('mongodb+srv://namasteyDev:5ODfPUF3kbZJQmGa@cluster0.jcj6rmy.mongodb.net/webchatwhenfailure');
}
module.exports=Connectdb


