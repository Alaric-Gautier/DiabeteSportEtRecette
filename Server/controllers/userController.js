const userService = require("../services/userService");
const { createError } = require("../utils/tools");

const userController = {
    register: async (req, res, next) => {
        try {
            const { firstName, lastName, email, birthDate, is_diabetic, diabetes_type, password, confirmPassword } = req.body;

            // create user
            const user = await userService.createUser({
                firstName,
                lastName,
                email,
                birthDate,
                is_diabetic,
                diabetes_type,
                password,
                confirmPassword,
            });
            res.status(201).json({ message: "un mail de confirmation vous a été envoyé à l'adresse indiquée", user });
        } catch (err) {
            next(err);
        }
    },
    changePassword: async (req, res, next) => {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const { id } = req.user;
        try {
            // change password
            await userService.changePassword(id, oldPassword, newPassword, confirmPassword);
            res.status(200).json({ message: "Mot de passe correctement modifié" });
        } catch (err) {
            next(err);
        }
    },
    updateProfile: async (req, res, next) => {
        const { id } = req.user;
        const { firstName, lastName, email, birthDate, is_diabetic, diabetes_type } = req.body;
        try {
            // Update user
            const updatedUser = await userService.updateProfile(id, firstName, lastName, email, birthDate, is_diabetic, diabetes_type);
            res.status(200).json({ message: "Information correctement mises à jour", data: updatedUser });
        } catch (err) {
            next(err);
        }
    },
    getUserById: async (req, res, next) => {
        const userId = req.user.id;
        try {
            const user = await userService.getUserById(userId);
            console.log(user);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    },
    deleteAccount: async (req, res, next) => {
        const { id } = req.user;
        try {
            // delete the user account
            await userService.deleteAccount(id);

            // Delete the cookies
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.status(200).json({message:"compte correctement supprimé"});
        } catch (err) {
            console.error(err);
            createError("error", "Impossible de supprimer le compte. Une erreur interne s'est produite.");
        }
    },
};

module.exports = userController;
