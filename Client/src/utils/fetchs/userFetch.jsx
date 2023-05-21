import factorizedFetch from "./factorizedFetch";

//* ----- USER FETCH ----- *\\
// getUserById
export const getUserById = async () => {
    await factorizedFetch("GET", "user", null, true)
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
    await factorizedFetch("DELETE", "user/deleteAccount", null, true)
}