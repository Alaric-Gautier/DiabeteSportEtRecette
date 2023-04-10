const express = require("express");
const router = express.Router();
const connect = require("../controllers/connectController");
const { verifyAccessToken } = require("../middlewares/authenticate");

router.post("/login", connect.login);
router.get("/logout", verifyAccessToken, connect.logout);

module.exports = router;
