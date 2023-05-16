const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createAccessToken, createRefreshToken, addToBlacklist } = require("../utils/token");
const { validateEmail } = require("../utils/validators");
const { createError, sendConfirmationLink } = require("../utils/tools");

const connectService = {
    login: async (email, password) => {
        validateEmail(email);
        //Search the user from the DataBase
        try {
            const user = await prisma.account.findUnique({
                where: { email },
                select: {
                    id: true,
                    roles: true,
                    password: true,
                    is_confirmed: true,
                },
            });
        } catch (error) {
            createError("AccountError");
        }

        // If no user has been found, throw an error

        if (!user.is_confirmed) {
            createError("Unauthorized", "Votre compte n'a pas été confirmé");
        }

        //Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If the password is not correct, throw an error
        if (!isPasswordValid) {
            createError("AccountError");
        }

        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);
        return { accessToken, refreshToken };
    },
    confirmUser: async token => {
        const { email } = jwt.verify(token, process.env.CONFIRMATION_CODE_SECRET);

        const user = await prisma.account.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            createError("NotFound", "Aucun utilisateur n'a été trouvé avec cette adresse");
        }

        await prisma.account.update({
            where: { email },
            data: { is_confirmed: true },
        });
    },
    sendNewLink: async email => {
        const user = await prisma.account.findUnique({
            where: { email },
        });

        if (!user) {
            createError("NotFound", "Aucun utilisateur n'a été trouvé avec cette adresse");
        }

        if (user.is_confirmed) {
            return false;
        }

        sendConfirmationLink(email);
    },
    logout: async (accessToken, refreshToken) => {
        try {
            accessTokenExpiration = new Date(Date.now() + 600 * 1000);
            refreshTokenExpiration = new Date(Date.now() + 3600 * 1000);

            // Fonction pour ajouter les tokens en base de données...
            await addToBlacklist(accessToken, accessTokenExpiration);
            await addToBlacklist(refreshToken, refreshTokenExpiration);

            return true;
        } catch (err) {
            createError("logoutError");
        }
    },
};

module.exports = connectService;
