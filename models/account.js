import mongoose from "mongoose";
const accountSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      default:null,
    },
    accountType: {
      type: String,
      enum: ["asset", "liability", "equity", "revenue", "expense"],
      required: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      default:null,
    },
    currency: { type: String, required: true, default: "USD" },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default:null,
    },
  },
  { timestamps: true, versionKey: false }
);

const Account = mongoose.model("Account", accountSchema);
export default Account;
