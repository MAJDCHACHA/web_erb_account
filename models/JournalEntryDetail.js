import mongoose from "mongoose";
const journalEntrySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  description: { type: String },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
  details: [
    {
      account: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
      debit: { type: Number,required: true },
      credit: { type: Number, required: true }
    }
  ],
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
}, { timestamps: true,versionKey: false });

const JournalEntry=mongoose.model("JournalEntry", journalEntrySchema);
export default JournalEntry;
