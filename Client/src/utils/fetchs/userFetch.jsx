import factorizedFetch from "./factorizedFetch";

//* ----- USER FETCH ----- *\\
// getUser
export const getUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await factorizedFetch("GET", "user", null, true)
            resolve(user.responseData)
        } catch (error) {
            reject(error)
        }
    })
}

// changePassword
export const changePassword = async (body) => {
    await factorizedFetch("POST", "user/changePassword", body, true)
}

// updateProfil
export const updateProfil = async (body) => {
    await factorizedFetch("PUT", "user/updateProfil", body, true)
}

// deleteAccount
export const deleteAccount = async () => {
    console.log("je delete mon compte");
    await factorizedFetch("DELETE", "user/deleteAccount", null, true)
}