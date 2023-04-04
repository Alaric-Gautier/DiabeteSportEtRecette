const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");

//public
router.post("/register", user.register);

//protected
router.get("/user/:id", user.getUserById);

module.exports = router;
