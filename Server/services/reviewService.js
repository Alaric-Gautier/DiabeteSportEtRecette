const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { isEmpty, isString, isNumber } = require("../utils/validators");
const { createError } = require("../utils/tools");

const reviewService = {
    create: async ({ rating, comment, userId, recipeId, sport_exerciseId }) => {
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

        // create review
        const review = await prisma.review.create({
            data: {
                rating: rating,
                comment: comment,
                author: {
                    connect: {
                        id: parseInt(userId),
                    },
                },
                recipe: {
                    connect: {
                        id: parseInt(recipeId),
                    },
                },
                sport_exercise: {
                    connect: {
                        id: parseInt(sport_exerciseId),
                    },
                },
            },
        });
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