const mongoose = require("mongoose")

const DemoSchema = new mongoose.Schema({
  name: { type: String, default: 'hahaha' },
  fromuserId: {  type: mongoose.Schema.Types.ObjectId,},
  touserId: { type: mongoose.Schema.Types.ObjectId, },
   text: { type: String,},
  date: { type: Date, default: Date.now },
 
});

const ModelDemo = mongoose.model('ModelDemo', DemoSchema);

module.exports=ModelDemo