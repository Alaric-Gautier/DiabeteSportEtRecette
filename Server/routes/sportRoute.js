const express = require("express");
const router = express.Router();
const sportExercise = require("../controllers/sportController");
const { verifyAccessToken } = require("../middlewares/authenticate");

//public
router.get("/sport-exercises/recent", sportExercise.getFiveMostRecentSportExercises);

//protected
router.get("/sport-exercises", verifyAccessToken, sportExercise.getAllSportExercises);
router.post("/sport-exercise/create", verifyAccessToken, sportExercise.create);
router.get("/sport-exercise/:id", verifyAccessToken, sportExercise.getSportExerciseById);
router.put("/sport-exercise/update/:id", verifyAccessToken, sportExercise.update);
router.delete("/sport-exercise/delete", verifyAccessToken, sportExercise.delete);

module.exports = router;