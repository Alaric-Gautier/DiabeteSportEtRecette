const connectService = require("../services/connectService");
const { createCookie } = require("../utils/token");
const { createError } = require("../utils/tools");

const connectController = {
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            // If the email is associated to an account, check the password and return the two tokens
            const { accessToken, refreshToken } = await connectService.login(email, password);

            // Create cookies with both tokens and send a message
            createCookie("accessToken", accessToken, res);
            createCookie("refreshToken", refreshToken, res);
            res.json({ message: "Successfully logged in" });
        } catch (err) {
            console.error(err);
            next(err);
        }
    },
    confirmUser: async (req, res, next) => {
        const confirmationKey = req.params.confirmationKey;
        try {
            await connectService.confirmUser(confirmationKey);
            res.status(200).redirect("http://localhost:5173/auth/login");
        } catch (err) {
            console.error(err);
            next(err);
        }
    },
    sendNewLink: async (req, res, next) => {
        const { email } = req.body;
        try {
            // If the user's account is already confirmed, no mail will be send
            const sendNewLink = await connectService.sendNewLink(email);
            if (sendNewLink) {
                return res.status(201).json({ message: "un mail de confirmation vous a été envoyé à l'adresse indiquée" });
            } else {
                return res.status(200).json({ message: "Vous avez déjà confirmé votre compte. Veuillez vous connecter." });
            }
        } catch (err) {
            console.error(err);
            next(err);
        }
    },
    logout: async (req, res, next) => {
        try {
            const accessToken = req.cookies.accessToken;
            const refreshToken = req.cookies.refreshToken;

            // This will add the tokens to the blacklist in DataBase
            const disconnected = await connectService.logout(accessToken, refreshToken);

            if (disconnected) {
                // Delete the cookies
                res.clearCookie("accessToken");
                res.clearCookie("refreshToken");

                res.status(200).send({ message: "You have been successfully disconnected" });
            } else {
                createError("Error");
            }
        } catch (err) {
            next(err);
        }
    },
    checkAuth: async (req, res, next) => {
        const refreshToken = req.cookies.refreshToken;
        try {
            const check = await connectService.checkRefreshToken(refreshToken);
            res.json({isAuth:check})
        } catch (err) {
            next(err)
        }
    }
};

module.exports = connectController;
