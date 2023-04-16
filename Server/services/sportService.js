const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { isEmpty, isString, isNumber } = require("../utils/validators");
const { createError } = require("../utils/tools");

const sportService = {
    create: async ({ title, description, is_for_children, duration, difficulty, images, userId }) => {
        // check if all required fields are filled
        isEmpty(title, description, is_for_children);

        // check if title and description are strings
        if (!isString(title) || !isString(description)) {
            createError("ValidationError", "Le titre et la description doivent être des chaînes de caractères");        
        }

        // check if duration and difficulty are numbers or null
        if (!isNumber(duration) || !isNumber(difficulty)) {
            createError("ValidationError", "La durée et la difficulté doivent être des nombres");
        }

        // check size and extension of images

        // create recipe
        const sportExercise = await prisma.sport_exercise.create({
            data: {
                title: title,
                description: description,
                is_for_children: is_for_children,
                duration: duration,
                difficulty: difficulty,
                author: {
                    connect: {
                        id: parseInt(userId),
                    },
                },
                images: {
                    create: {
                        url: "https://cdn.pixabay.com/photo/2017/04/27/08/29/man-2264825_960_720.jpg",
                    },
                },
            },
        });
        return sportExercise;
    },
    getSportExerciseById: async sportExerciseId => {
        // get sport exercise
        const sportExercise = await prisma.sport_exercise.findUnique({
            where: {
                id: parseInt(sportExerciseId),
            },
            include: {
                images: true,
                reviews: true,
                author: true,
            },
        });
        return sportExercise;
    },
};

module.exports = sportService;


