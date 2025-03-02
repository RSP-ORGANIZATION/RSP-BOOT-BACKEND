import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, unique: true, trim: true, required: true },
  password: { type: String, required: true },
});

export const User = mongoose.model("users", userSchema);
