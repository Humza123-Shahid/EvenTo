const mongoose = require('mongoose');
const { Schema } = mongoose;

const beverageSchema = new Schema({
  name: { type: String, required: true },
  type:{ type:String, required:true},
  price:{type:Number,required:true},
  availableQuantity:{type:Number, required:true},

}, { timestamps: true });

module.exports=mongoose.model("Beverage", beverageSchema);