const express = require("express");
const router = express.Router();
const recipe = require("../controllers/recipeController");

//public

//protected
router.post("/recipe/create", recipe.create);

module.exports = router;