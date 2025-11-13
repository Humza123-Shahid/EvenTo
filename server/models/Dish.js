const mongoose = require('mongoose');
const { Schema } = mongoose;

const dishSchema = new Schema({
  name: { type: String, required: true },
  category:{ type:String, required:true},
  cost:{type:Number,required:true},
  menu_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Menus", required: true },
  ingredients:{type:String, required:true},

}, { timestamps: true });

module.exports=mongoose.model("Dish", dishSchema);