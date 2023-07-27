const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createAccessToken, createRefreshToken, addToBlacklist, isTokenBlacklisted } = require("../utils/token");
const { validateEmail, isEmpty } = require("../utils/validators");
const { createError, sendConfirmationLink, isUserExists } = require("../utils/tools");
const ConfirmationPair = require("../models/ConfirmationPair");

const connectService = {
    login: async (email, password) => {
        isEmpty(email, password);
        validateEmail(email);
        //Search the user from the DataBase
        let user;
        try {
            user = await prisma.account.findUnique({
                where: { email },
                select: {
                    id: true,
                    roles: true,
                    password: true,
                    is_confirmed: true,
                },
            });
        } catch (error) {
            // If no user has been found, throw an error
            console.error(error);
            createError("AccountError");
        }

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
    confirmUser: async confirmationKey => {
        const confirmationPair = await ConfirmationPair.findOne({ confirmationKey });
        if (!confirmationPair) {
            createError("NotFound", "Le lien de confirmation n'est pas valide ou il a expiré");
        }

        const token = confirmationPair.confirmationCode;

        const { email } = jwt.verify(token, process.env.CONFIRMATION_CODE_SECRET);
        const user = await prisma.account.findUnique({
            where: {
                email,
            },
        });

        isUserExists(user);

        try {
            await prisma.account.update({
                where: { email },
                data: { is_confirmed: true },
            });

            await ConfirmationPair.deleteOne({ confirmationKey });
        } catch (error) {
            console.error(error);
            createError("Error");
        }
    },
    sendNewLink: async email => {
        isEmpty(email);
        validateEmail(email);

        let user;
        try {
            user = await prisma.account.findUnique({
                where: { email },
            });
        } catch (error) {
            console.error(error);
            createError("NotFound", "Aucun utilisateur n'a été trouvé avec cette adresse");
        }
        isUserExists(user);

        if (user.is_confirmed) {
            return false;
        }

        const linkSend = await sendConfirmationLink(email);
        return true;
    },
    logout: async (accessToken, refreshToken) => {
        try {
            accessTokenExpiration = new Date(Date.now() + 600 * 1000);
            refreshTokenExpiration = new Date(Date.now() + 3600 * 1000);

            // Fonction pour ajouter les tokens en base de données...
            try {
                await addToBlacklist(accessToken, accessTokenExpiration);
                await addToBlacklist(refreshToken, refreshTokenExpiration);
            } catch (error) {
                console.error(error);
                createError("Error");
            }

            return true;
        } catch (error) {
            console.error(error);
            createError("logoutError");
        }
    },
    checkRefreshToken: async (refreshToken) => {
        let isAuth;
        try {
            const isBlacklisted = await isTokenBlacklisted(refreshToken);
            
            if (!refreshToken || isBlacklisted) isAuth = false;
            
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
                if (err) {
                    isAuth = false
                } else {
                    isAuth = true;
                }
            });
            return isAuth;
        } catch (err) {
            createError("Error")
        }
    }
};

module.exports = connectService;
