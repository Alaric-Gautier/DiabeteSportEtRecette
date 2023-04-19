const express = require("express");
const router = express.Router();
const { validation, rejection } = require("../controllers/moderationController");
const { verifyAccessToken } = require("../middlewares/authenticate");
const {checkRole} = require("../middlewares/checkRole")

router.post("/validation", verifyAccessToken, checkRole(["admin", "moderateur"]), validation);
router.post("/rejection", verifyAccessToken, checkRole(["admin", "moderateur"]), rejection);

module.exports = router;
