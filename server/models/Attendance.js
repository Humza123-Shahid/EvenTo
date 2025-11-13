const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendanceSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date:{type:Date,required:true},
  status:{type: String, enum: ["Present","Absent"]}
}, { timestamps: true });

module.exports=mongoose.model("Attendance", attendanceSchema);