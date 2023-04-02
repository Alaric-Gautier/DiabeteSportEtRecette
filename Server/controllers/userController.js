const userService = require('../services/userService');

const userController = {
    async register(req, res) {
        userService.register(req, res);
    },
    async getUserById(req, res) {
        userService.getUserById(req, res);
    }
}

module.exports = userController;