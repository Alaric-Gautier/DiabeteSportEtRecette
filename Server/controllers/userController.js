const userService = require("../services/userService");

const userController = {
    register: async (req, res, next) => {
        try {
            const { firstName, lastName, email, birthDate, is_diabetic, diabetes_type, password } = req.body;

            // create user
            const user = await userService.createUser({ firstName, lastName, email, birthDate, is_diabetic, diabetes_type, password });
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    },
    changePassword: async (req, res) => {
        try {
            const { oldPassword, newPassword, confirmPassword } = req.body;
            const { id } = req.user;

            // change password
            await userService.changePassword(id, oldPassword, newPassword, confirmPassword, false);
            res.status(200).json({ message: "Mot de passe correctement modifié" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateProfile: async (req, res) => {
        try {
            const { id } = req.user;
            const { firstName, lastName, email, birthDate, is_diabetic, diabetes_type } = req.body;

            // Update user

            const updatedUser = await userService.updateProfile(id, firstName, lastName, email, birthDate, is_diabetic, diabetes_type);
            res.status(200).json({ message: "Information correctement mises à jour", data: updatedUser });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Une erreur s'est produite. Veuillez réessayer" });
        }
    },
    getUserById: async (req, res) => {
    getUserById: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const user = await userService.getUserById(userId);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = userController;
