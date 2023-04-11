const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const moment = require("moment");
const { validateEmail, validatePassword, isEmpty, passwordMatch } = require("../utils/tools");

const userService = {
    createUser: async ({ firstName, lastName, email, birthDate, is_diabetic, diabetes_type, password }) => {
        // check if all required fields are filled with isEmpty function
        isEmpty(firstName, lastName, email, birthDate, is_diabetic, password);

        // if email is already use, throw an error
        if (await prisma.account.findUnique({ where: { email: email } })) {
            throw new Error("Email already exists");
        }

        // check if email is valid
        validateEmail(email);

        // check if password has at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
        validatePassword(password);

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // check if birthDate format is valid
        if (!moment(birthDate, "DD/MM/YYYY", true).isValid()) {
            throw new Error("Birth date format is not valid, please use DD/MM/YYYY");
        }

        // create user
        const user = await prisma.account.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                birthDate: birthDate,
                is_diabetic: is_diabetic,
                diabetes_type: diabetes_type,
                password: hashedPassword,
                // roles: {
                //     connect: {
                //         id: 1,
                //     }
                // }
            },
        });

        return user;
    },
    getUserById: async userId => {
        const user = await prisma.account.findUnique({
            where: {
                id: parseInt(userId),
            },
            include: {
                roles: true,
                sport_exercises: true,
                recipes: true,
                reviews: true,
            },
        });

        return user;
        // res.json(user);
    },
    getUserByMail: async email => {
        //Search the user from the DataBase
        const user = await prisma.account.findUnique({
            where: { email },
        });

        return user;
    },
    changePassword: async (id, oldPassword, newPassword, confirmPassword, lost) => {
        // Input verifications
        isEmpty(oldPassword, newPassword, confirmPassword);
        passwordMatch(newPassword, confirmPassword);

        if (!lost) {
            // If it's not a forgotten password
            const user = await prisma.account.findUnique({ where: { id } });
            // Check if the oldPassword is correct
            const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
            if (!isOldPasswordValid) {
                throw new Error("Mot de passe incorrect");
            }

            if (newPassword === oldPassword) {
                throw new Error("Vous ne pouvez pas utiliser le même mot de passe ");
            }
        }

        validatePassword(newPassword);

        // hash password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const passwordChanged = await prisma.account.update({
            where: {
                id: id,
            },
            data: {
                password: hashedPassword,
            },
        });

        if (!passwordChanged) {
            throw new Error("Une erreur s'est produite");
        }
    },
};

module.exports = userService;
