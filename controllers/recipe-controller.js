import { Recipe } from "../schemas/recipe-schema.js";

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
    return response.statu(400).json({ message: "Bad Request" });
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
    const userId = req.params.userId;

    // Find favorite recipe IDs for the user
    const favoriteDoc = await Favorite.findOne({ userId });

    if (!favoriteDoc || favoriteDoc.recipeIds.length === 0) {
      return res.status(200).json({ recipes: [] }); // Return empty if no favorites
    }

    // Fetch full recipe details using the stored IDs
    const recipes = await Recipe.find({ _id: { $in: favoriteDoc.recipeIds } });

    res.status(200).json({ recipes });
  } catch (error) {
    return response.status(500).json({ message: "Error fetching favorites" });
  }
};
