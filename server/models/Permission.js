const mongoose = require('mongoose');
const { Schema } = mongoose;

const permissionSchema = new Schema({
  permission:{type:String,required:true}
}, { timestamps: true });

module.exports=mongoose.model("Permission", permissionSchema);