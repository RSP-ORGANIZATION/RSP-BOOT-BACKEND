import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/RSP_BOOTSTRAP");
    console.log("Connection Successful");
  } catch (error) {
    console.log("Error:", error);
  }
}