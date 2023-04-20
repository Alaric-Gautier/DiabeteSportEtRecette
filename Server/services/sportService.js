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
    getFiveMostRecentSportExercises: async () => {
        // get five most recent sport exercises
        const sportExercises = await prisma.sport_exercise.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 5,
            include: {
                images: true,
                reviews: true,
            },
        });
        return sportExercises;
    },
    getAllSportExercises: async () => {
        // get all sport exercises
        const sportExercises = await prisma.sport_exercise.findMany({
            include: {
                images: true,
                reviews: true,
            },
        });
        return sportExercises;
    },
    update: async ({ title, description, is_moderate ,is_for_children, duration, difficulty, images, sportExerciseId }) => {
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

        // update sport exercise
        const sportExercise = await prisma.sport_exercise.update({
            where: {
                id: parseInt(sportExerciseId),
            },
            data: {
                title: title,
                description: description,
                is_moderate: is_moderate,
                is_for_children: is_for_children,
                duration: duration,
                difficulty: difficulty,
                images: {
                    create: {
                        url: "https://cdn.pixabay.com/photo/2017/04/27/08/29/man-2264825_960_720.jpg",
                    },
                },
            },
        });
        return sportExercise;
    },
    delete: async sportExerciseId => {
        // delete sport exercise
        const sportExercise = await prisma.sport_exercise.delete({
            where: {
                id: parseInt(sportExerciseId),
            },
        });
        return sportExercise;
    },
};

module.exports = sportService;


