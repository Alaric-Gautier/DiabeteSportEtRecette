const express = require("express");
const router = express.Router();
const recipe = require("../controllers/recipeController");
const { verifyAccessToken } = require("../middlewares/authenticate");

//public
router.get("/recipes/recent", recipe.getFiveMostRecentRecipes);

//protected
router.get("/recipes", verifyAccessToken, recipe.getAllRecipes);
router.post("/recipe/create", verifyAccessToken, recipe.create);
router.get("/recipe/:id", verifyAccessToken, recipe.getRecipeById);
router.put("/recipe/update/:id", verifyAccessToken, recipe.update);
router.delete("/recipe/delete/:id", verifyAccessToken, recipe.delete);

module.exports = router;