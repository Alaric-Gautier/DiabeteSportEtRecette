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
        const confirmationCode = req.params.confirmationCode;
        try {
            await connectService.confirmUser(confirmationCode);
            res.status(200).json({ message: "Votre compte a bien été confirmé" });
            res.redirect("localhost:5173/auth/login");
        } catch (err) {
            console.error(err);
            next(err);
        }
    },
    sendNewLink: async (req, res, next) => {
        const { email } = req.body;
        try {
            // If the user's account is already confirmed, no mail will be send
            if (!(await connectService.sendNewLink(email))) {
                return res.status(200).json({ message: "Vous avez déjà confirmé votre compte. Veuillez vous connecter." });
            }
            res.status(201).json({ message: "un mail de confirmation vous a été envoyé à l'adresse indiquée" });
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
};

module.exports = connectController;
