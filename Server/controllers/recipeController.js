const userRecipe = require('../services/recipeService');

const recipeController = {
    create: (req, res) => {
        userRecipe.create(req, res);
    },
};

module.exports = recipeController;