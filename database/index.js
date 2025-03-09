// 
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGO_URI, MONGO_DB, NODE_ENV } = process.env;

export const connectDB = async () => {
    if (!MONGO_URI) {
        console.error("MONGO_URI is not defined. Check your environment variables.");
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI, { dbName: MONGO_DB });
        console.log(`MongoDB connected to "${MONGO_DB}" in ${NODE_ENV || "unknown"} mode`);
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};
