const connectService = require("../services/connectService");

const connectController = {
    login: (req, res) => {
        connectService.login(req, res);
    },
    logout: () => {
        connectService.logout(req, res);
    },
};

module.exports = connectController;
