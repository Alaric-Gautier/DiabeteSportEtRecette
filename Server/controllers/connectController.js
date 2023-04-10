const connectService = require("../services/connectService");
const { isEmpty } = require("../utils/tools");

const connectController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // If the email is associated to an account, check the password and return the two tokens
            const { accessToken, refreshToken } = await connectService.login(email, password);

            // Create cookies with both tokens and send a message
            createCookie("accessToken", accessToken, 600, res);
            createCookie("refreshToken", refreshToken, 3600, res);
            res.json({ message: "Successfully logged in" });
        } catch (err) {
            if ((err.message = "AccountError")) {
                res.status(401).json({ message: "L'adresse email ou le mot de passe est erroné." });
            } else {
                res.status(500).json({ message: "Une erreur inattendue est survenue. Veuillez réessayer" });
            }
        }
    },
    logout: async (req, res) => {
        try {
            const accessToken = req.cookies.accessToken;
            const refreshToken = req.cookies.refreshToken;
            console.log("logoutController accessToken", accessToken);
            console.log("logoutController refreshToken", refreshToken);

            // This will add the tokens to the blacklist in DataBase
            const disconnected = await connectService.logout(accessToken, refreshToken);

            if (disconnected) {
                console.log("disconnected ? ", disconnected);
                // Delete the cookies
                res.clearCookie("accessToken");
                res.clearCookie("refreshToken");
                console.log("Cookies cleared");

                res.status(200).send({ message: "You have been successfully disconnected" });
                console.log("=========END=========");
            } else {
                res.sendStatus(500);
            }
        } catch (err) {
            res.sendStatus(500);
        }
    },
};

module.exports = connectController;
