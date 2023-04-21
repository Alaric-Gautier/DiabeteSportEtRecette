const express = require("express");
const router = express.Router();
const review = require("../controllers/reviewController");
const { verifyAccessToken } = require("../middlewares/authenticate");

//protected
router.post("/create", verifyAccessToken, review.create);
router.delete("/delete/:id", verifyAccessToken, review.delete);

module.exports = router;