const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
}, { timestamps: true });

module.exports= mongoose.model("Review", reviewSchema);