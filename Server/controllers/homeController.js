const homeService = require('../services/homeService');

const homeController = { 
    async displayHome(req, res) {
        homeService.displayHome(req, res);
    }
}

module.exports = homeController;