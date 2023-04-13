const { Module } = require("module");
const { forgotPassword } = require("../services/passwordService");

const passwordController = {
    forgotPassword: async (req, res, next) => {
        try {
            const { email } = req.body;

            await forgotPassword(email);

            res.status(200).json({ message: "un e-mail a été envoyé à l'adresse indiquée" });
        } catch (err) {
            next(err);
        }
    },
    resetPassword: async (req, res, next) => {
        try {
        } catch (err) {
            next(err);
        }
    },
};

module.exports = passwordController;
