import mongoose, { Schema } from "mongoose";

const recipeSchema = new Schema({
  title: { type: String, required: true, trim: true },
  steps: { type: [String], unique: true, trim: true, required: true },
  ingredients: {
    type: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true },
      },
    ],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

export const Recipe = mongoose.model("recipes", recipeSchema);
