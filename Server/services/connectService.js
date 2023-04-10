const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { createAccessToken, createRefreshToken, addToBlacklist } = require("../utils/token");
const { validateEmail } = require("../utils/tools");

const connectService = {
    login: async (email, password) => {
        validateEmail(email);
        //Search the user from the DataBase
        const user = await prisma.account.findUnique({
            where: { email },
        });

        // If no user has been found, throw an error
        if (!user) {
            throw new Error("AccountError");
        }

        //Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If the password is not correct, throw an error
        // TODO tester si mot de passe erronné, le compare fonctionne
        if (!isPasswordValid) {
            throw new Error("AccountError");
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
            console.error(err);
            throw new Error("An unexpected Error has occured");
        }
    },
};

module.exports = connectService;
