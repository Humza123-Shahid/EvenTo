const mongoose = require('mongoose');
const { Schema } = mongoose;

const vendorSchema = new Schema({
  //company_name: {type:String,required:true},
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  service_type: {type:String,required:true},//e.g., catering, audiovisual, venue, ticketing
  //contact_person:{type:String,required:true},
  //contact_number: {type:String,required:true},
  //email: { type: String, required: true},
  rating:{ type:String,required:true}//'excellent,good,average,poor,bad
}, { timestamps: true });
module.exports=mongoose.model("Vendor", vendorSchema);