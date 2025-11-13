const mongoose = require('mongoose');
const { Schema } = mongoose;

const rolepermissionSchema = new Schema({
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Roles", required: true },
  permission_id: { type: mongoose.Schema.Types.ObjectId, ref: "Permissions", required: true }
}, { timestamps: true });

module.exports=mongoose.model("RolePermission", rolepermissionSchema);