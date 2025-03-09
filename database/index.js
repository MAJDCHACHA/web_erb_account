import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { MONGO_URI, MONGO_DB } = process.env;

export const connectDB = async () => {
    try {
        // Remove the deprecated options
        await mongoose.connect(MONGO_URI, { dbName: MONGO_DB });
        console.log(`MongoDB connected to ${MONGO_DB} in ${process.env.NODE_ENV} mode`);
        
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};
