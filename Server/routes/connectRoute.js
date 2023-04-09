const express = require("express");
const router = express.Router();
const connect = require("../controllers/connectController");

router.post("/login", connect.login);
router.get("/logout", connect.logout);

module.exports = router;
