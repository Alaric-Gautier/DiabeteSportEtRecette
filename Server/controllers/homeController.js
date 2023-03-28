const homeService = require('../services/homeService');

const homeController = { 
    displayHome: (req, res) => {
        homeService.displayHome(req, res);
    }
}

module.exports = homeController;