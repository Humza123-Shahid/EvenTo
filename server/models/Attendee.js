const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendeeSchema = new Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true},
  phone: { type: String },
  CheckInStatus: {type:Boolean, default: false }
}, { timestamps: true });

module.exports=mongoose.model("Attendee", attendeeSchema);