const express = require("express");
const router = express.Router();
const { login, confirmUser, logout, sendNewLink, checkAuth } = require("../controllers/connectController");
const { verifyAccessToken } = require("../middlewares/authenticate");
const { forgotPassword, resetPassword, newPassword } = require("../controllers/passwordController");


// connectRoutes
router.post("/login", login);
router.get("/confirmUser/:confirmationKey", confirmUser);
router.post("/getNewConfirmationCode", sendNewLink);
router.get("/logout", verifyAccessToken, logout);
router.get("/checkAuth", checkAuth)

router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:resetCode", resetPassword);
// router.post("/resetPassword/:resetCode", changePassword);

module.exports = router;
