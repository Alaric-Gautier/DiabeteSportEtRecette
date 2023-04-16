const recipeService = require("../services/recipeService");
const userRecipe = require("../services/recipeService");

const recipeController = {
    create: async (req, res, next) => {
        try {
            // Get all fields from request body
            const { title, description, tag, glycemic_charge, duration, difficulty, images } = req.body;

            // Call the service to create a recipe
            const userId = req.user.id;
            const recipe = await recipeService.create({ title, description, tag, glycemic_charge, duration, difficulty, images, userId });

            res.status(201).json(recipe);
        } catch (err) {
            next(err);
        }
    },
    getRecipeById: async (req, res, next) => {
        try {
            const recipeId = req.params.id;
            // Call the service to get a recipe
            const recipe = await recipeService.getRecipeById(recipeId);
            res.status(200).json(recipe);
        } catch (err) {
            next(err);
        }
    },
    getFiveMostRecentRecipes: async (req, res, next) => {
        try {
            // Call the service to get all recipes
            const recipes = await recipeService.getFiveMostRecentRecipes();
            res.status(200).json(recipes);
        } catch (err) {
            next(err);
        }
    },
    getAllRecipes: async (req, res, next) => {
        try {
            // Call the service to get all recipes
            const recipes = await recipeService.getAllRecipes();
            res.status(200).json(recipes);
        } catch (err) {
            next(err);
        }
    },
    //TODO getRecipesByTag peut être utilisé pour afficher les recettes par tag dans la page d'accueil

    update: async (req, res, next) => {
        try {
            // Get all fields from request body
            const { title, description, tag, glycemic_charge, duration, difficulty, images } = req.body;

            // Call the service to update a recipe
            const recipeId = req.params.id;
            const recipe = await recipeService.update({ title, description, tag, glycemic_charge, duration, difficulty, images, recipeId });

            res.status(200).json(recipe);
        } catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            // Get recipe id from request params
            const recipeId = req.params.id;

            // Call the service to delete a recipe
            await recipeService.delete(recipeId);

            res.status(204).json();
        } catch (err) {
            next(err);
        }
    },
};

module.exports = recipeController;
