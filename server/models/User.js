const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String},
  phone: { type: String },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Roles", required: true },
  //role: { type: String, enum: ["admin", "organizer","clerk", "attendee","Staff","Vendor","Waiter","Photographer"], default: "attendee" },
}, { timestamps: true });

module.exports=mongoose.model("User", userSchema);