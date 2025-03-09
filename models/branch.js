import mongoose from "mongoose";
const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    location: { type: String },
  },
  { timestamps: true, versionKey: false }
);
const Branch = mongoose.model("Branch", branchSchema);
export default Branch;
