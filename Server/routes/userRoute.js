const express = require("express");
const userRouter = express.Router();
const { register, getUserById, changePassword, updateProfile, deleteAccount } = require("../controllers/userController");
const { verifyAccessToken } = require("../middlewares/authenticate");

//public
userRouter.post("/register", register);

//protected
userRouter.get("/", verifyAccessToken, getUserById);
userRouter.post("/changePassword", verifyAccessToken, changePassword);
userRouter.put("/updateProfil", verifyAccessToken, updateProfile);
userRouter.delete("/deleteAccount", verifyAccessToken, deleteAccount);

module.exports = userRouter;
