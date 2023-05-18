const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { isEmpty, isString, isNumber } = require("../utils/validators");
const { createError } = require("../utils/tools");

const recipeService = {
    create: async ({ title, description, tag, glycemic_charge, duration, difficulty, images, userId }) => {
        // check if all required fields are filled
        isEmpty(title, description, tag, glycemic_charge);

        // check if title, description and tag are strings
        if (!isString(title) || !isString(description) || !isString(tag)) {
            createError("ValidationError", "Le titre, la description et le tag doivent être des chaînes de caractères");
        }

        // check if glycemic_charge, duration and difficulty are numbers or null
        if (!isNumber(glycemic_charge) || !isNumber(duration) || !isNumber(difficulty)) {
            createError("ValidationError", "La charge glycémique, la durée et la difficulté doivent être des nombres");
        }

        // check size and extension of images

        // create recipe
        try {
            const recipe = await prisma.recipe.create({
                data: {
                    title: title,
                    description: description,
                    tag: tag,
                    glycemic_charge: glycemic_charge,
                    duration: duration,
                    difficulty: difficulty,
                    author: {
                        connect: {
                            id: parseInt(userId),
                        },
                    },
                    images: {
                        create: {
                            url: "https://cdn.pixabay.com/photo/2017/03/13/13/39/pancakes-2139844_960_720.jpg",
                        },
                    },
                    // ingredients: {
                    //     connect: {
                    //         id: 1,
                    //     },
                    //     connect: {
                    //         id: 2,
                    //     },
                    //     connect: {
                    //         id: 3,
                    //     },
                    // },
                },
            });
            return recipe;
        } catch (error) {
            console.error(error);
            createError("Error");
        }
    },
    getRecipeById: async recipeId => {
        // get recipe
        try {
            const recipe = await prisma.recipe.findUnique({
                where: {
                    id: parseInt(recipeId),
                },
                include: {
                    ingredients: true,
                    images: true,
                    reviews: true,
                    author: true,
                },
            });

            if (!recipe) {
                createError("NotFound", "La recette que vous tentez de consulter n'existe pas ou a été supprimée");
            }
            return recipe;
        } catch (error) {
            createError("Error");
        }
    },
    getFiveMostRecentRecipes: async () => {
        // get five most recent recipe
        try {
            const recipes = await prisma.recipe.findMany({
                take: 5,
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    ingredients: true,
                    images: true,
                    reviews: false,
                    author: false,
                },
            });
            return recipes;
        } catch (error) {
            console.error(error);
            createError("Error");
        }
    },
    getAllRecipes: async () => {
        // get all recipes
        try {
            const recipes = await prisma.recipe.findMany({
                include: {
                    ingredients: true,
                    images: true,
                    reviews: false,
                    author: false,
                },
            });
            return recipes;
        } catch (error) {
            console.error(error);
            createError("Error");
        }
    },
    update: async ({ title, description, tag, glycemic_charge, duration, difficulty, images, recipeId }) => {
        // check if all required fields are filled
        isEmpty(title, description, tag, glycemic_charge);

        // check if title, description and tag are strings
        if (!isString(title) || !isString(description) || !isString(tag)) {
            createError("ValidationError", "Le titre, la description et le tag doivent être des chaînes de caractères");
        }

        // check if glycemic_charge, duration and difficulty are numbers or null
        if (!isNumber(glycemic_charge) || !isNumber(duration) || !isNumber(difficulty)) {
            createError("ValidationError", "La charge glycémique, la durée et la difficulté doivent être des nombres");
        }

        // check size and extension of images

        // update recipe
        try {
            const recipe = await prisma.recipe.update({
                where: {
                    id: parseInt(recipeId),
                },
                data: {
                    title: title,
                    description: description,
                    tag: tag,
                    glycemic_charge: glycemic_charge,
                    duration: duration,
                    difficulty: difficulty,
                    images: {
                        create: {
                            url: "https://cdn.pixabay.com/photo/2017/03/13/13/39/pancakes-2139844_960_720.jpg",
                        },
                        // connect: {
                        //     path: "https://cdn.pixabay.com/photo/2017/03/13/13/39/pancakes-2139844_960_720.jpg",
                    },
                    // ingredients: {
                    //     connect: {
                    //         id: 1,
                    //     },
                    //     connect: {
                    //         id: 2,
                    //     },
                    //     connect: {
                    //         id: 3,
                    //     }
                    // },
                },
            });
            return recipe;
        } catch (error) {
            console.error(error);
            createError("Error");
        }
    },
    delete: async recipeId => {
        // delete recipe
        try {
            const recipe = await prisma.recipe.delete({
                where: {
                    id: parseInt(recipeId),
                },
            });
            return recipe;
        } catch (error) {
            console.error(error);
            createError("Error");
        }
    },
};

module.exports = recipeService;
