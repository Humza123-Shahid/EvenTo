const mongoose = require('mongoose');
const { Schema } = mongoose;

const staffSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  //name: { type: String, required: true },
  //email: { type: String, required: true},
  //phone: { type: String },
  //staffRole: { type: String, required:true },
  salary:{type:Number,required:true},
  availability_status:{type:Boolean,required:true}
}, { timestamps: true });

module.exports=mongoose.model("Staff", staffSchema);