import express from "express";
import "dotenv/config";
import { addRecipe, getAllRecipes, getFilteredItems } from "../controllers/recipe-controller.js";

const recipeRoute = express.Router();

// * Recipe creation route
recipeRoute.post("/add", addRecipe);
recipeRoute.get("/all", getAllRecipes);
recipeRoute.post("/getbyname", getFilteredItems)
recipeRoute.get("/favorites", )

export default recipeRoute;
