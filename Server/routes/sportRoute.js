const express = require("express");
const router = express.Router();
const sportExercise = require("../controllers/sportController");
const { verifyAccessToken } = require("../middlewares/authenticate");

//public
router.get("/recent", sportExercise.getFiveMostRecentSportExercises);

//protected
router.get("/", verifyAccessToken, sportExercise.getAllSportExercises);
router.post("/create", verifyAccessToken, sportExercise.create);
router.get("/:id", verifyAccessToken, sportExercise.getSportExerciseById);
// router.get("/for-children", verifyAccessToken, sportExercise.getSportExercisesForChildren);
router.put("/update/:id", verifyAccessToken, sportExercise.update);
router.delete("/delete", verifyAccessToken, sportExercise.delete);

module.exports = router;