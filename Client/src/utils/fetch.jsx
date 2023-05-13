import factorizedFetch from "./factorizedFetch";

// const register = async (data) => {
//     const response = await fetch(`${import.meta.env.VITE_API}/register`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     });
//     return response.json();
// };
const BASE_URL = import.meta.env.VITE_API


//* ----- CONNECT FETCH ----- *\\
// login
await factorizedFetch("POST", "login", body,true)

const login = async (body) => {
        await factorizedFetch(`${BASE_URL}/login`,"POST",body,true)
}

// logout
await factorizedFetch("GET", "logout", {}, true)

const logout = async () => {
    await factorizedFetch(`${BASE_URL}/logout`, "GET", _, true)
}

// confirmUser
await factorizedFetch("GET", `confirmUser/${confirmationCode}`)
await factorizedFetch("GET", "confirmUser", null, false, confirmationCode)

const confirmUser = async (confirmationCode) => {
    await factorizedFetch(`${BASE_URL}/confirmUser/${confirmationCode}`,"GET")
}

// getNewConfirmationCode
await factorizedFetch("POST", "/getNewConfirmationCode",body)

const getNewConfirmationCode = async(body) => {
    await factorizedFetch()
}

//* ----- USER FETCH ----- *\\
// register
await factorizedFetch("POST","register",body)

const register = async (body) => {
        await factorizedFetch(`${BASE_URL}/register`, "POST", body)
}

// getUserById
await factorizedFetch("GET","user",null,true)

// changePassword
await factorizedFetch("POST","user/changePassword", body, true)

// updateProfil
await factorizedFetch("PUT","user/updateProfil", body, true)

// deleteAccount
await factorizedFetch("DELETE","user/deleteAccount", null, true)



//* ----- FORGOT PASSWORD FETCH ----- *\\
// forgotPassword
await factorizedFetch("POST", "forgotPassword", body)

// resetPassword
await factorizedFetch("POST", `resetPassword/${resetCode}`, body)



//* ----- MODERATION FETCH ----- *\\
// validation
await factorizedFetch("/POST",`moderation/validation/${contentType}/${contentId}`,null,true)

// rejection
await factorizedFetch("/POST",`moderation/rejection/${contentType}/${contentId}`,null,true)

//* ----- SPORTS FETCH ----- *\\
// recent
await factorizedFetch("GET", "sport-exercise/recent")

// getAllSportExercises
await factorizedFetch("GET", "sport-exercise", null, true)

// getSportExerciseById
await factorizedFetch("GET", `sport-exercise/${sportId}`, null, true)

// create sportExercise
await factorizedFetch("POST", "sport-exercise/create", body, true)

// update sportExercise
await factorizedFetch("PUT",`sport-exercise/update/${sportId}`, body, true)

// delete sportExercise
await factorizedFetch("DELETE", `sport-exercise/delete/${sportId}`, null, true)


//* ----- RECIPE FETCH ----- *\\
// recent
await factorizedFetch("GET", "recipe/recent")

// getAllRecipes
await factorizedFetch("GET", "recipe", null, true)

// getRecipeById
await factorizedFetch("GET", `recipe/${sportId}`, null, true)

// create recipe
await factorizedFetch("POST", "recipe/create", body, true)

// update recipe
await factorizedFetch("PUT",`recipe/update/${sportId}`, body, true)

// delete recipe
await factorizedFetch("DELETE", `recipe/delete/${sportId}`, null, true)



//* ----- Review Fetch ----- *\\
// create review
await factorizedFetch("POST", `review/create`, body, true)

// delete review
await factorizedFetch("DELETE", `review/delete/${reviewId}`)

