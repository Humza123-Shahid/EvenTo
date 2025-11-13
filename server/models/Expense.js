const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  category: { type: String,required:true},
  amount: { type: Number,required:true},
  description: { type: String,required:true},
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports=mongoose.model("Expense", expenseSchema);