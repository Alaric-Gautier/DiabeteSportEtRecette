const express = require("express");
const router = express.Router();
const recipe = require("../controllers/recipeController");
const { verifyAccessToken } = require("../middlewares/authenticate");

//public

//protected
router.post("/recipe/create", verifyAccessToken, recipe.create);
router.put("/recipe/update/:id", verifyAccessToken, recipe.update);
router.delete("/recipe/delete", verifyAccessToken, recipe.delete);

module.exports = router;