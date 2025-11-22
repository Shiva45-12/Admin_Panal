import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/adminpanel");
    console.log("MongoDB Connected to adminpanel");
  } catch (err) {
    console.error("Database connection error:", err);
    throw err;
  }
};