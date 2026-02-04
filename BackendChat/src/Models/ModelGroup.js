const mongoose = require("mongoose")

const GroupSchema = new mongoose.Schema({
  groupname: { type: String, default: 'hahaha' },
  allId: [{  type: mongoose.Schema.Types.ObjectId,}],
   SenderId: { type: String,},
  date: { type: Date, default: Date.now },
 
});

const ModelGroup = mongoose.model('ModelGroup', GroupSchema);

module.exports=ModelGroup