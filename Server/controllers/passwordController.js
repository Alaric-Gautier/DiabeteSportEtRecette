const { Module } = require("module");
const { forgotPassword, resetPassword } = require("../services/passwordService");

const passwordController = {
    forgotPassword: async (req, res, next) => {
        const { email } = req.body;
        console.log("==================");
        console.log("==================");
        console.log("==================");
        console.log("email = ", email);
        console.log("==================");
        console.log("==================");
        console.log("==================");
        try {
            await forgotPassword(email);
            return res.status(200).json({ message: "un e-mail a été envoyé à l'adresse indiquée" });
        } catch (err) {
            next(err);
        }
    },
    resetPassword: async (req, res, next) => {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        try {
            await resetPassword(token, password, confirmPassword);
            return res.status(200).json({ message: "Le mot de passe a correctement été réinitialisé" });
        } catch (err) {
            next(err);
        }
    },
};

module.exports = passwordController;
