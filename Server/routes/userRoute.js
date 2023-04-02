const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");

router.post("/register", user.register);
router.get("/user/:id", user.getUserById);

module.exports = router;