import { request } from "express";
import { Recipe } from "../schemas/recipe-schema.js";
import { Favorite } from "../schemas/favorite-schema.js";

export const addRecipe = async (request, response) => {
  const { title, steps, ingredients, imageUrl, description } = request.body;
  console.log(typeof title, steps, ingredients, imageUrl);
  if (!title || !steps || !ingredients || !imageUrl) {
    return response.status(400).json({ message: "Invalid values" });
  }

  try {
    await Recipe.create({
      title: title,
      steps: steps,
      ingredients: ingredients,
      imageUrl: imageUrl,
      description: description,
    });

    return response.json({ message: "Recipe added successfully" });
  } catch (error) {
    console.log("Error:", error);
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllRecipes = async (request, response) => {
  try {
    const recipes = await Recipe.find();
    if (recipes.length === 0) {
      response.status(404).json({ message: "No items found" });
    }
    response.json({ message: "Items fetched", recipes: recipes });
  } catch (error) {
    console.log("Error:", error);
  }
};

export const getFilteredItems = async (request, response) => {
  const { item } = request.body;
  if (!item) {
    return response.status(400).json({ message: "Bad Request" });
  }
  try {
    const items = await Recipe.find({ title: { $regex: item, $options: "i" } });
    console.log("Filtered items:", items);
    return response.json({ message: "Items filtered!!", recipes: items });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export const getFavoriteRecipes = async (request, response) => {
  try {
    const { userPhone } = request.body;
    console.log("userPhone:", userPhone);

    if (!userPhone) {
      return response.status(400).json({ message: "Bad Request" });
    }
    const favoriteDoc = await Favorite.findOne({ userPhone: userPhone });
    if (!favoriteDoc || favoriteDoc.recipeIds.length === 0) {
      return response.status(404).json({ recipes: [] });
    }
    const recipes = await Recipe.find({ _id: { $in: favoriteDoc.recipeIds } });
    console.log("Recipes:", recipes);
    return response.json({ message: "Favorites fetched", favorites: recipes });
  } catch (error) {
    console.log("getFavoriteRecipes error:", error);
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export const addFavoriteRecipe = async (request, response) => {
  const { userPhone, recipeId } = request.body;
  console.log("userPhone:", userPhone, "recipeId:", recipeId);

  if (!userPhone || !recipeId) {
    return response.status(400).json({ message: "Bad Request" });
  }
  try {
    const favoriteDoc = await Favorite.findOne({ userPhone: userPhone });
    if (!favoriteDoc) {
      await Favorite.create({ userPhone: userPhone, recipeIds: [recipeId] });
    } else {
      if (!favoriteDoc.recipeIds.includes(recipeId)) {
        favoriteDoc.recipeIds.push(recipeId);
        await favoriteDoc.save();
      }
    }
    return response.json({ message: "Recipe added to favorites" });
  } catch (error) {
    console.log("Error:", error);
    return response.status(500).json({ message: "Something went wrong" });
  }
};
