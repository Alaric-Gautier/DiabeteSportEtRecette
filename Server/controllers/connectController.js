const connectService = require("../services/connectService");
const userService = require("../services/userService");

const connectController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // If the email is associated to an account, check the password and return the two tokens
            const { accessToken, refreshToken } = await connectService.login(email, password);
            console.log("===============Controller===============");
            console.log("accessToken ===", accessToken);
            console.log("refreshToken ===", refreshToken);
            console.log("========================================");
            // Create cookies with both tokens and send a message
            createCookie("accessToken", accessToken, 600, res);
            createCookie("refreshToken", refreshToken, 3600, res);
            res.json({ message: "Successfully logged in" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "An unexpected error has occured" });
        }
    },
    logout: async (req, res) => {
        try {
            // TODO 1-Récupérer les tokens des cookies

            // This will add the tokens to the blacklist in DataBase
            const disconnected = await connectService.logout(accessToken, refreshToken);

            // TODO 2-Supprimer les cookies
            res.status(200).send(disconnected);
        } catch (err) {
            res.sendStatus(500);
        }
        connectService.logout(req, res);
    },
};

module.exports = connectController;
