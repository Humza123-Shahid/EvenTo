const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
  name:{type:String,required:true},
  status:{type:Boolean}
}, { timestamps: true });

module.exports=mongoose.model('Role',roleSchema)
//export default mongoose.model("Role", roleSchema);