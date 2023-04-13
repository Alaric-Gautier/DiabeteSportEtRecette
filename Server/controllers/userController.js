const userService = require("../services/userService");

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
        } catch (error) {
            next(err);
        }
    },
    getUserById: async (req, res, next) => {
        const userId = req.user.id;
        try {
            const user = await userService.getUserById(userId);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = userController;
