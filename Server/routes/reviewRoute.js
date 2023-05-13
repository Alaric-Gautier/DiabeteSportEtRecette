const express = require("express");
const router = express.Router();
const review = require("../controllers/reviewController");
const { verifyAccessToken } = require("../middlewares/authenticate");

// public
router.get("/:contentId",review.getReviewByContentId )

//protected
router.post("/create/:content", verifyAccessToken, review.create);
router.delete("/delete/:id", verifyAccessToken, review.delete);

module.exports = router;