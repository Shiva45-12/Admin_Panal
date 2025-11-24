import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://sv575014_db2:cP5Kp%233BFiJyi2-@cluster0.gxefepr.mongodb.net/admin_panel?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    });
    console.log("MongoDB Connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    console.log("Trying local MongoDB...");
    try {
      await mongoose.connect("mongodb://localhost:27017/admin_panel", {
        serverSelectionTimeoutMS: 5000
      });
      console.log("Connected to local MongoDB");
    } catch (localError) {
      console.log("Local MongoDB also failed, continuing without database");
    }
  }
};