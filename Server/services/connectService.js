const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { createAccessToken, createRefreshToken, createCookie } = require("../utils/token");

const connectService = {
    login: async (email, password) => {
        //Search the user from the DataBase
        const user = await prisma.account.findUnique({
            where: { email },
        });

        // If no user has been found, throw an error
        if (!user) {
            throw new Error("Wrong mail or password");
        }

        //Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If the password is not correct, throw an error
        if (!isPasswordValid) {
            throw new Error("Wrong mail or password");
        }

        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);
        return { accessToken, refreshToken };
    },
    logout: (req, res) => {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        // Fonction pour ajouter les tokens en base de données...

        // Delete the cookies
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        res.send({ message: "You have been successfully disconnected" });
    },
};

module.exports = connectService;
