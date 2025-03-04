import mongoose, { Schema } from "mongoose";

const favoriteSchema = new Schema({
  userPhone: { type: String, required: true, trim: true },
  recipeIds: { type: [mongoose.Schema.Types.ObjectId], ref: "recipes" },
});

export const Favorite = mongoose.model("favorites", favoriteSchema);
