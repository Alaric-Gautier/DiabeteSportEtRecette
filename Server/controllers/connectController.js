const connectService = require("../services/connectService");

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
            console.log(err);
            res.status(500).json({ message: "An unexpected error has occured" });
        }
    },
    logout: () => {
        connectService.logout(req, res);
    },
};

module.exports = connectController;
