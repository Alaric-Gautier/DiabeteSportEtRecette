const sportService = require('../services/sportService');

const sportController = {
    create: async (req, res, next) => {
        try {
            // Get all fields from request body
            const { title, description, is_for_children, duration, difficulty, images } = req.body;

            // Call the service to create a recipe
            const userId = req.user.id;
            const sportExercise = await sportService.create({ title, description, is_for_children, duration, difficulty, images, userId });

            res.status(201).json(sportExercise);
        } catch (err) {
            next(err);
        }
    },
    getSportExerciseById: async (req, res, next) => {
        try {
            const sportExerciseId = req.params.id;
            // Call the service to get a sport exercise
            const sportExercise = await sportService.getSportExerciseById(sportExerciseId);
            res.status(200).json(sportExercise);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = sportController;
