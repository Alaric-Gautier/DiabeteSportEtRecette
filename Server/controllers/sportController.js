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
    getFiveMostRecentSportExercises: async (req, res, next) => {
        try {
            // Call the service to get all sport exercises
            const sportExercises = await sportService.getFiveMostRecentSportExercises();
            res.status(200).json(sportExercises);
        } catch (err) {
            next(err);
        }
    },
    getAllSportExercises: async (req, res, next) => {
        try {
            // Call the service to get all sport exercises
            const sportExercises = await sportService.getAllSportExercises();
            res.status(200).json(sportExercises);
        } catch (err) {
            next(err);
        }
    },
    //TODO getSportExercisesForChildren peut être utilisé pour afficher les exercices adaptés aux enfants dans la page d'accueil

    update: async (req, res, next) => {
        try {
            // Get all fields from request body
            const { title, description, is_for_children, duration, difficulty, images } = req.body;

            // Call the service to update a sport exercise
            const sportExerciseId = req.params.id;
            const is_moderate = false;
            const sportExercise = await sportService.update({ title, description, is_moderate, is_for_children, duration, difficulty, images, sportExerciseId });

            res.status(200).json(sportExercise);
        } catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            // Call the service to delete a sport exercise
            const sportExerciseId = req.params.id;
            await sportService.delete(sportExerciseId);

            res.status(204).json();
        } catch (err) {
            next(err);
        }
    },
};

module.exports = sportController;
