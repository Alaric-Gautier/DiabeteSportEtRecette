const express = require("express");
const router = express.Router();
const recipe = require("../controllers/recipeController");
const { verifyAccessToken } = require("../middlewares/authenticate");

//public
router.get("/recipes/recent", recipe.getFiveMostRecentRecipes);

//protected
router.get("/", verifyAccessToken, recipe.getAllRecipes);
router.post("/create", verifyAccessToken, recipe.create);
router.get("/:id", verifyAccessToken, recipe.getRecipeById);
router.put("/update/:id", verifyAccessToken, recipe.update);
router.delete("/delete", verifyAccessToken, recipe.delete);

module.exports = router;