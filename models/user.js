import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true }, // Default active status if not provided
    role: { type: String, default: "user" }, // Default role if not provided
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
        default: true,
      },
    ],
    branchID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      default: true,
    },
  },
  { versionKey: false }
);
const User = mongoose.model("User", userSchema);
export default User;
