const mongoose = require('mongoose');
const { Schema } = mongoose;

const packageSchema = new Schema({
  EventID: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true  },
  PackageName: { type: String, required: true }, //packages associated with event
  PackageType: { type: String, required: true},  //e.g., "Food(quantity etc)," "Accommodation(of total person)," "Ticket," "Service"
  Description: { type:String, required: true},
  Price:{type:Number,required:true},
  AvailabilityStatus:{type:Boolean,required:true}
}, { timestamps: true });

module.exports=mongoose.model("Package", packageSchema);