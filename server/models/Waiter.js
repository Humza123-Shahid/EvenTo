const mongoose = require('mongoose');
const { Schema } = mongoose;

const waiterSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  //name: {type:String,required:true},
  experienceLevel: {type:String,required:true},
  //contact: {type:String,required:true},
  salary:{type:Number,required:true},
  //attendance_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance", required: true }
}, { timestamps: true });

module.exports=mongoose.model("Waiter", waiterSchema);