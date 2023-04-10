const express = require("express");
const router = express.Router();
const recipe = require("../controllers/recipeController");
const { verifyAccessToken } = require("../middlewares/authenticate");

//public

//protected
router.post("/recipe/create", verifyAccessToken, recipe.create);

module.exports = router;