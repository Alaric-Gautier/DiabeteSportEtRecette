const userService = require('../services/userService');

const userController = {
    register: (req, res) => {
        userService.register(req, res);
    },
    getUserById: (req, res) => {
        userService.getUserById(req, res);
    },
};

module.exports = userController;
