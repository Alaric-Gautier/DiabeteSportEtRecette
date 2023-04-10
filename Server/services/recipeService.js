const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { isEmpty, isString, isNumber } = require("../utils/tools");

const recipeService = {
    create: async ({ title, description, tag, glycemic_charge, duration, difficulty, images, userId }) => {
        // check if all required fields are filled
        isEmpty(title, description, tag, glycemic_charge);

        // check if title, description and tag are strings
        if (!isString(title) || !isString(description) || !isString(tag)) {
            throw new Error("Le titre, la description et le tag doivent être des chaînes de caractères sans chiffres ni caractères spéciaux");
        }

        // check if glycemic_charge, duration and difficulty are numbers or null
        if (!isNumber(glycemic_charge) || !isNumber(duration) || !isNumber(difficulty)) {
            throw new Error("La charge glycémique, la durée et la difficulté doivent être des nombres");
        }

        // check size and extension of images

        // create recipe
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
    },
};

module.exports = recipeService;
