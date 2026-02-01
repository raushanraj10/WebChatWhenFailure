const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: { type: String, default: 'hahaha' },
   photo: { type: String,},
   gender:{ type: String,},
  date: { type: Date, default: Date.now },
 
});

const ModelUser = mongoose.model('ModelUser', UserSchema);

module.exports=ModelUser