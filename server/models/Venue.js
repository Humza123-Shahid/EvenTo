const mongoose = require('mongoose');
const { Schema } = mongoose;

const venueSchema = new Schema({
  venueName: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  capacity: { type: Number },
  contactPerson: { type: String },
  contactPhone: { type: String },
}, { timestamps: true });

module.exports=mongoose.model("Venue", venueSchema);