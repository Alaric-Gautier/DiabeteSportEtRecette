const recipeService = require("../services/recipeService");
const userRecipe = require("../services/recipeService");

const recipeController = {
    create: async (req, res) => {
        try {
            // Get all fields from request body
            const { title, description, tag, glycemic_charge, duration, difficulty, images } = req.body;

            // Call the service to create a recipe
            const userId = req.user.id;
            const recipe = await recipeService.create({ title, description, tag, glycemic_charge, duration, difficulty, images, userId });

            res.status(201).json(recipe);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
};

module.exports = recipeController;
