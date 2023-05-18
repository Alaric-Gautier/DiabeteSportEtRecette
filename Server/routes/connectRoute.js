const express = require("express");
const router = express.Router();
const { login, confirmUser, logout, sendNewLink } = require("../controllers/connectController");
const { verifyAccessToken } = require("../middlewares/authenticate");

router.post("/login", login);
router.get("/confirmUser/:confirmationKey", confirmUser);
router.post("/getNewConfirmationCode", sendNewLink);
router.get("/logout", verifyAccessToken, logout);

module.exports = router;
