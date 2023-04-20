const express = require("express");
const router = express.Router();
const { validation, rejection } = require("../controllers/moderationController");
const { verifyAccessToken } = require("../middlewares/authenticate");
const { checkRole } = require("../middlewares/checkRole");

router.post("/validation/:contentType/:contentId", verifyAccessToken, checkRole(["admin", "moderateur"]), validation);
router.post("/rejection/:contentType/:contentId", verifyAccessToken, checkRole(["admin", "moderateur"]), rejection);

module.exports = router;
