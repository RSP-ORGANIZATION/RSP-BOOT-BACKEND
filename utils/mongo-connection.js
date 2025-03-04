import mongoose from "mongoose";
import "dotenv/config";

const mongo_url = process.env.MONGODB_URL;

export const connectDB = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log("Connection Successful");
  } catch (error) {
    console.log("Error:", error);
  }
};
