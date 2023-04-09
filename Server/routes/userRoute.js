const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");
const { verifyAccessToken } = require("../middlewares/authenticate");

//public
router.post("/register", user.register);

//protected
router.get("/user/:id", verifyAccessToken, user.getUserById);

module.exports = router;
