import { Navigate } from "react-router-dom";
import factorizedFetch from "./factorizedFetch";

//* ----- CONNECT FETCH ----- *\\
// register
export const register = async (body) => {
        await factorizedFetch("POST","user/register",body)
}

export const login = async ({email, password}, setIsAuth) => {
    const result = await factorizedFetch("POST", "login", {email, password},true)
    if (result.login === 200) {
        setIsAuth(true)
        Navigate("/dashboard/my-account")
    }
} 

// logout
export const logout = async (setIsAuth) => {
    setIsAuth(false)
    // await factorizedFetch("GET", "logout", {}, true)
}

// confirmUser
export const confirmUser = async (confirmationCode) => {
    await factorizedFetch("GET", `confirmUser/${confirmationCode}`)
}

// getNewConfirmationCode
export const getNewConfirmationCode = async (body) => {
    await factorizedFetch("POST", "/getNewConfirmationCode",body)
}