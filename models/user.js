import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true,unique: [true ,"pleas name is unique"] },
    email: { type: String, required: true, unique: [true ,"pleas email is unique"]},
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    role: { type: String, default: "User" },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
    branchID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    refreshToken: { type: String },  
  },
  { versionKey: false }
);
const User = mongoose.model("User", userSchema);
export default User;
