const mongoose = require('mongoose');
const { Schema } = mongoose;

const inventorySchema = new Schema({
  name: {type:String,required:true},
  category: {type:String,required:true},
  rentalPrice: {type:Number,required:true},
  availableQuantity: {type:Number,required:true},
  status:{type:String,required:true}
  // status:{type:String, enum: ["New", "Good", "Needs Repair", "Lost"],required:true}
}, { timestamps: true });
//decor_items,sound_System,lighting,furniture,cloth_materials
module.exports=mongoose.model("Inventory", inventorySchema);