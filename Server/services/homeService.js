const homeService = {
    async displayHome(req, res) {
        res.send("This is the home page.");
    }
}

module.exports = homeService;