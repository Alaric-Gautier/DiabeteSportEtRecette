const userService = require("../services/userService");

const userController = {
    register: async (req, res) => {
        try {
            const { firstName, lastName, email, birthDate, is_diabetic, diabetes_type, password } = req.body;

            // create user
            const user = await userService.createUser({ firstName, lastName, email, birthDate, is_diabetic, diabetes_type, password });
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ message: err.message, error: err.errorCodes });
        }
    },
    getUserById: async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await userService.getUserById(userId);
            res.status(200).json(user);
        } catch (err) {
            res.sendStatus(500);
        }
    },
};

module.exports = userController;
