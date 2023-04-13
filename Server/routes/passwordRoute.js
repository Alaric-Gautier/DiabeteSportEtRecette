const express = require("express");
const PasswordRouter = express.Router();
const { forgotPassword, resetPassword } = require("../controllers/passwordController");

PasswordRouter.post("/forgotPassword", forgotPassword);
PasswordRouter.post("/resetPassword/:resetCode", resetPassword);

module.exports = PasswordRouter;
