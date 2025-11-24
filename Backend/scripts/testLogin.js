import mongoose from "mongoose";
import Admin from "../Server/models/Admin.js";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";

const testLogin = async () => {
  try {
    await connectDB();
    
    // Check if admin exists
    const admin = await Admin.findOne({ email: "admin@admin.com" });
    
    if (!admin) {
      console.log(" No admin found with email: admin@admin.com");
      console.log(" Run: npm run init-admin");
      return;
    }

    console.log(" Admin found:", admin.name);
    console.log(" Email:", admin.email);
    
    // Test password
    const testPassword = "admin123";
    console.log("🔍 Testing password:", testPassword);
    console.log("🔐 Stored hash:", admin.password);
    
    const isMatch = await bcrypt.compare(testPassword, admin.password);
    
    if (isMatch) {
      // console.log(" Password verification: SUCCESS");
      // console.log(" Login should work with:");
      // console.log("  Email: admin@admin.com");
      // console.log("  Password: admin123");
    } else {
      // console.log(" Password verification: FAILED");
      // console.log(" Password hash issue detected");
      
      // Try to fix by recreating admin with proper hash
      // console.log("Recreating admin with proper hash...");
      await Admin.deleteOne({ email: "admin@admin.com" });
      
      const newAdmin = new Admin({
        name: "Admin",
        email: "admin@admin.com",
        password: "admin123"
      });
      
      await newAdmin.save();
      console.log("Admin recreated successfully!");
    }
    
  } catch (error) {
    console.error(" Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

testLogin();