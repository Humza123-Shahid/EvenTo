const mongoose = require('mongoose');
const { Schema } = mongoose;

const photographerSchema = new Schema({
  //name: { type: String, required: true },
  //contact: { type: String, required: true},
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rate:{type:Number,required:true},
  availability_status:{type:Boolean,required:true}
}, { timestamps: true });

module.exports=mongoose.model("Photographer", photographerSchema);