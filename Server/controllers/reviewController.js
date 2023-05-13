const reviewService = require("../services/reviewService");

const reviewController = {
    getReviewByContentId: async (req, res, next) => {
        try {
            const { contentId } = req.params;
            const reviews = await reviewService.getReviewByContentId(contentId);

            res.status(200).json(reviews);
        } catch (err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        try {
            // Get fields from request
            const { rating, comment } = req.body;
            const { content } = req.params;
            //! content doit être de la forme "contentType-contentId"

            // Call the service to create a review
            const userId = req.user.id;
            const review = await reviewService.create(rating, comment, userId, content);

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
    },
};

module.exports = reviewController;
