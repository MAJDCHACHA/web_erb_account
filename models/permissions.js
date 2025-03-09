import mongoose from "mongoose";
const permissionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true,"Please set permission unique"],
  }
  
} ,{ timestamps: true ,versionKey: false});
const Permission = mongoose.model("Permission", permissionSchema);
export default Permission;
