const mongoose = require("mongoose");
const ModelGroup = require("./ModelGroup");

const GroupMessageSchema = new mongoose.Schema({
  text: { type: String, default: 'hahaha' },
  groupId: {  type: mongoose.Schema.Types.ObjectId,},
   SenderId: { type: String,},
  date: { type: Date, default: Date.now },
});

const ModelGroupMessage = mongoose.model('ModelGroupMessage', GroupMessageSchema);

module.exports=ModelGroupMessage