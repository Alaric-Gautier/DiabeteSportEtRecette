import factorizedFetch from "./factorizedFetch";

//* ----- SPORTS FETCH ----- *\\
// recent
export const getRecentSportExercise = async () => {
    await factorizedFetch("GET", "sport-exercise/recent")
}

// getAllSportExercises
export const getAllSportExercises = async () => {
    await factorizedFetch("GET", "sport-exercise", null, true)
}

// getSportExerciseById
export const getSportExerciseById = async (sportId) => {
    await factorizedFetch("GET", `sport-exercise/${sportId}`, null, true)
}

// create sportExercise
export const createSportExercise = async (body) => {
    await factorizedFetch("POST", "sport-exercise/create", body, true)
}

// update sportExercise
export const updateSportExercise = async (sportId, body) => {
    await factorizedFetch("PUT", `sport-exercise/update/${sportId}`, body, true)
}

// delete sportExercise
export const deleteSportExercise = async (sportId) => {
    await factorizedFetch("DELETE", `sport-exercise/delete/${sportId}`, null, true)
}

