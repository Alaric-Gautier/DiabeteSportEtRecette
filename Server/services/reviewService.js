const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { isEmpty, isString, isNumber } = require("../utils/validators");
const { createError } = require("../utils/tools");

const reviewService = {
    getReviewByContentId: async contentId => {
        const reviews = await prisma.review.findMany({
            where: {
                OR: [
                    {
                        sport_exercise: {
                            id: parseInt(contentId),
                        },
                    },
                    {
                        recipe: {
                            id: parseInt(contentId),
                        },
                    },
                ],
            },
        });

        if (!reviews) createError("NotFound");

        return reviews;
    },
    create: async (rating, comment, userId, content) => {
        //! content doit être de la forme "contentType-contentId"
        // get the type and id from content
        const [type, id] = content.split("-");

        // check if all required fields are filled
        isEmpty(rating);

        // check if rating is a number
        if (!isNumber(rating)) {
            createError("ValidationError", "La note doit être un nombre compris entre 0 et 5");
        }

        // check if comment is a string
        if (!isString(comment)) {
            createError("ValidationError", "Le commentaire doit être une chaîne de caractères");
        }

        const createReview = async (contentType,contentId) =>{
            review = await prisma.review.create({
                data: {
                    rating: rating,
                    comment: comment,
                    author: {
                        connect: {
                            id: parseInt(userId),
                        },
                    },
                    [contentType]: {
                        connect: {
                            id: parseInt(contentId),
                        },
                    },
                },
            });

        }
        
        // create review
        const review = createReview(type, id)
        
        return review;
    },
    delete: async ({ id }) => {
        // delete review
        const review = await prisma.review.delete({
            where: {
                id: parseInt(id),
            },
        });
        return review;
    },
};

module.exports = reviewService;
