const connectService = require("../services/connectService");

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
                res.sendStatus(500);
            }
        } catch (err) {
            next(err);
        }
    },
};

module.exports = connectController;
