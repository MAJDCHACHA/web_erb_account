import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    }, // المرسل
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    }, // المستلم
    fromBranch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    }, // الفرع المرسل
    toBranch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    }, // الفرع المستقبل
    amount: { type: Number, required: true }, // المبلغ
    currency: { type: String, default: "USD" }, // نوع العملة
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    }, // حالة الحوالة
    dateSend: { type: Date, required: true },
    dateReceive: { type: Date },
    type: { type: String, enum: ["incoming", "Outgoing"],required: true  },
    notes:{type:String,required:true}
  },
  { timestamps: true,versionKey: false }
);
const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
