const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  amount: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ["credit_card", "paypal", "bank_transfer", "cash"],
    required: true,
  },
  transactionId: { type: String },
   status: { type: String, default: "pending" },

  // status: { type: String, enum: ["success", "failed", "pending"], default: "pending" },
  // status: { type: String, enum: ["success", "failed", "pending"], default: "pending" },
  paymentDate: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports=mongoose.model("Payment", paymentSchema);