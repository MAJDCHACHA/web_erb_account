// import mongoose from "mongoose";
// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     isActive: { type: Boolean, default: true }, // Default active status if not provided
//     role: { type: String, default: "user" }, // Default role if not provided
//     permissions: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Permission",
//         default: true,
//       },
//     ],
//     branchID: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Branch",
//       default: true,
//     },
//     refreshToken:{
//       type:String
//     }
//   },
//   { versionKey: false }
// );
// const User = mongoose.model("User", userSchema);
// export default User;
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    role: { type: String, default: "user" },
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
    refreshToken: { type: String }, // إضافة حقل لتخزين التوكن
  },
  { versionKey: false }
);
const User = mongoose.model("User", userSchema);
export default User;
