const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { createAccessToken, createRefreshToken, addToBlacklist } = require("../utils/token");
const { validateEmail } = require("../utils/validators");
const { createError } = require("../utils/tools");

const connectService = {
    login: async (email, password) => {
        validateEmail(email);
        //Search the user from the DataBase
        const user = await prisma.account.findUnique({
            where: { email },
        });

        // If no user has been found, throw an error
        if (!user) {
            createError("Accountrror");
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
