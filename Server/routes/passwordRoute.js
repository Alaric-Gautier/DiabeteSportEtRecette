const express = require("express");
const PasswordRouter = express.Router();
const { forgotPassword, resetPassword, newPassword } = require("../controllers/passwordController");

PasswordRouter.post("/forgotPassword", forgotPassword);
PasswordRouter.get("/resetPassword/:resetCode", resetPassword);
// PasswordRouter.post("/resetPassword/:resetCode", changePassword);

module.exports = PasswordRouter;
