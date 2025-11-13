const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventName: { type: String, required: true },
  description: { type: String },
  category: { type: String }, // e.g. Music, Sports, Tech
  venue: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
  eventDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed", "cancelled"],
    default: "upcoming",
  },
}, { timestamps: true });

module.exports=mongoose.model("Event", eventSchema);