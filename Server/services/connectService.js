const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { createAccessToken, createRefreshToken, createCookie } = require("../utils/token");

const connectService = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            //Search the user from the DataBase
            const user = await prisma.account.findUnique({
                where: { email },
            });

            //Check if the password is correct
            const isPasswordValid = await bcrypt.compare(password, user.password);

            // If no user has been found or if the password is not correct, return an error
            if (!user || !isPasswordValid) {
                return res.status(404).send({ message: "Wrong mail or password" });
            }

            const accessToken = createAccessToken(user);
            const refreshToken = createRefreshToken(user);
            // const cookieOptions = {
            //     httpOnly: true,
            //     expires: new Date(Date.now() + 3600 * 1000), // Expires in 1h
            //     sameSite: "strict",
            // };
            // res.cookie("refreshToken", refreshToken, cookieOptions).json({ message: "Successfully logged in", accessToken });
            createCookie("refreshToken", refreshToken, 3600, res);
            res.json({ message: "Successfully logged in", accessToken });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "An unexpected error has occured" });
        }
    },
    logout: (req, res) => {
        res.send({ message: "You have been successfully disconnected" });
    },
};

module.exports = connectService;
