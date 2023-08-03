const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const moment = require("moment");
const { validateEmail, validatePassword, isEmpty, passwordMatch } = require("../utils/validators");
const { createError, sendConfirmationLink, isUserExists } = require("../utils/tools");

const userService = {
    createUser: async ({ firstName, lastName, email, birthDate, is_diabetic, diabetes_type, password, confirmPassword }) => {
        // check if all required fields are filled with isEmpty function
        isEmpty(firstName, lastName, email, birthDate, is_diabetic, password, confirmPassword);

        // check if email is valid
        validateEmail(email);

        // if email is already use, throw an error
        if (await prisma.account.findUnique({ where: { email: email } })) {
            createError("ResourceConflictError", "Impossible de créer un compte car cet email est déjà utilisé");
        }

        // confirm the password
        passwordMatch(password, confirmPassword);

        // check if password has at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
        validatePassword(password);

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // check if birthDate format is valid
        formattedBirthDate = moment(birthDate, "YYYY-MM-DD").format("DD/MM/YYYY");

        if (!moment(formattedBirthDate, "DD/MM/YYYY", true).isValid()) {
            createError("ValidationError", "Le format de la date de naissance est invalide, veuillez respecter le format DD/MM/YYYY");
        }

        try {
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
                    is_confirmed: false,
                    roles: {
                        connect: {
                            id: 1,
                        },
                    },
                },
            });
            // if user successfully created, generate a token and send it to the user mail
            isUserExists(user, () => sendConfirmationLink(email));

            return prisma.account.findUnique({
                where: {
                    id: user.id,
                },
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    roles: true,
                },
            });
        } catch (error) {
            console.error(error);
            createError("Error");
        }
    },
    getUserById: async userId => {
        try {
            const user = await prisma.account.findUnique({
                where: {
                    id: parseInt(userId),
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    birthDate: true,
                    is_diabetic: true,
                    diabetes_type: true,
                    createdAt: true,
                    updatedAt: true,
                    is_confirmed: true,
                    roles:true,
                    sport_exercises:true,
                    recipes:true,
                    reviews:true
                },
            });
            return user;
        } catch (error) {
            console.error(error);
            createError("Error");
        }
    },
    getUserByMail: async email => {
        //Search the user from the DataBase
        try {
            const user = await prisma.account.findUnique({
                where: { email },
            });

            isUserExists(user);

            return user;
        } catch (error) {
            console.error(error);
            createError("Error");
        }
    },
    getUserByContentId: async (contentType, contentId) => {
        try {
            const user = await prisma[contentType].findFirst({
                where: {
                    id: Number(contentId),
                },
                select: {
                    author: true,
                },
            });
            return user;
        } catch (error) {
            console.error(error);
            createError("NotFound");
        }
    },
    changePassword: async (id, oldPassword, newPassword, confirmPassword) => {
        // Input verifications
        isEmpty(oldPassword, newPassword, confirmPassword);
        passwordMatch(newPassword, confirmPassword);

        // If it's not a forgotten password
        try {
            const user = await prisma.account.findUnique({ where: { id } });
            // Check if the oldPassword is correct
            const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
            if (!isOldPasswordValid) {
                createError("AccountError", "Le mot de passe actuel est erroné");
            }

            if (newPassword === oldPassword) {
                createError("ValidationError", "Vous ne pouvez pas réutiliser votre mot de passe actuel");
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
                createError("updateError");
            }
        } catch (error) {
            console.error(error);
            createError("Error");
        }
    },
    updateProfile: async (id, firstName, lastName, email, birthDate, is_diabetic, diabetes_type) => {
        const user = await prisma.account.findUnique({ where: { id } });

            console.log("mail existant = ", user.email);
            if (email && email !== user.email) {
                const existingEmail = await prisma.account.findUnique({where:{email}})

                if (existingEmail) {
                    createError("ResourceConflictError", "Un compte existe déjà avec cette adresse email");
                }
            }

        try {
            const updatedUser = await prisma.account.update({
                where: {
                    id,
                },
                data: {
                    firstName,
                    lastName,
                    email,
                    birthDate,
                    is_diabetic,
                    diabetes_type,
                },
            });
            if (updatedUser) {
                return updatedUser;
            } else {
                createError("updateError");
            }
        } catch (error) {
            console.error(error);
            createError("Error");
        }
    },
    deleteAccount: async id => {
        try {
            await prisma.account.delete({ where: { id } });
        } catch (error) {
            console.error(error);
            createError("Error");
        }
    },
};

module.exports = userService;
