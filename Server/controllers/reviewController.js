const reviewService = require("../services/reviewService");

const reviewController = {
    create: async (req, res, next) => {
        try {
            // Get all fields from request body
            const { rating, comment } = req.body;

            // Call the service to create a review
            const userId = req.user.id;
            const review = await reviewService.create({ rating, comment, userId, recipeId, sport_exerciseId });

            res.status(201).json(review);
        } catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const reviewId = req.params.id;
            // Call the service to delete a review
            const review = await reviewService.delete({ reviewId });

            res.status(200).json(review);
        } catch (err) {
            next(err);
        }
    }
};

module.exports = reviewController;