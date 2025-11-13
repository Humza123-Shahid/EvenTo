const mongoose = require('mongoose');
const { Schema } = mongoose;
// const assignmentSchema = new mongoose.Schema({
//   staff_id: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
//   event_id: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true  },
//   //role: { type: String, required:true },
//   role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Roles", required: true },
//   shift_start: { type: Date, required: true },
//   shift_end: { type: Date, required: true }

// }, { timestamps: true });
const assignmentSchema = new Schema({
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true  },
  //role: { type: String, required:true },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Roles", required: true },
  shift_start: { type: Date, required: true },
  shift_end: { type: Date, required: true }

}, { timestamps: true });
 module.exports=mongoose.model('Assignment',assignmentSchema)
