const mongoose = require('mongoose');
const { Schema } = mongoose;

const menuSchema = new Schema({
  name: {type:String,required:true},
  // type: { type: String, enum: ["veg", "non-veg", "mixed"] },
  type: { type: String,required:true},
  pricePerPerson: {type:Number,required:true},
  description: {type:String,required:true},
}, { timestamps: true });

module.exports=mongoose.model("Menu", menuSchema);