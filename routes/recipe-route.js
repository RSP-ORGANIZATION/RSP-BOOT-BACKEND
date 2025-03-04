import express from "express";
import "dotenv/config";
import {
  addRecipe,
  getAllRecipes,
  getFavoriteRecipes,
  getFilteredItems,
  addFavoriteRecipe,
} from "../controllers/recipe-controller.js";

const recipeRoute = express.Router();

// * Recipe creation route
recipeRoute.post("/add", addRecipe);
recipeRoute.get("/all", getAllRecipes);
recipeRoute.post("/getbyname", getFilteredItems);
recipeRoute.post("/favorites/all", getFavoriteRecipes);
recipeRoute.post("/favorites/add", addFavoriteRecipe);

export default recipeRoute;
