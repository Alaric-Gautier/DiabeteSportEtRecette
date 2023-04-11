const express = require("express");
const userRouter = express.Router();
const { register, getUserById, changePassword, updateProfile } = require("../controllers/userController");
const { verifyAccessToken } = require("../middlewares/authenticate");

//public
userRouter.post("/register", register);

//protected
userRouter.get("/user", verifyAccessToken, getUserById);
userRouter.post("/user/changePassword", verifyAccessToken, changePassword); //? Est-ce qu'il est vraiment utile de garder "/user" ?
userRouter.put("/user/updateProfil", verifyAccessToken, updateProfile);

module.exports = userRouter;
