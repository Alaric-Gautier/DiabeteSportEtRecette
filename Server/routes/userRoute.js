const express = require("express");
const userRouter = express.Router();
const { register, getUserById, changePassword, updateProfile, deleteAccount } = require("../controllers/userController");
const { verifyAccessToken } = require("../middlewares/authenticate");

//public
userRouter.post("/register", register);

//protected
userRouter.get("/user", verifyAccessToken, getUserById);
userRouter.post("/user/changePassword", verifyAccessToken, changePassword);
userRouter.put("/user/updateProfil", verifyAccessToken, updateProfile);
userRouter.delete("/user/deleteAccount", verifyAccessToken, deleteAccount);

module.exports = userRouter;
