const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["confirmed", "cancelled", "pending", 'Waitlisted', 'Attended'], default: "pending" },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" }
}, { timestamps: true });

module.exports=mongoose.model("Booking", bookingSchema);