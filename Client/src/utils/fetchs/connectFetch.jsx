import { Navigate } from "react-router-dom";
import factorizedFetch from "./factorizedFetch";

//* ----- CONNECT FETCH ----- *\\
// register
export const register = async (body) => {
    await factorizedFetch("POST","user/register",body)
}

export const login = async ({email, password}, setIsAuth) => {
    const result = await factorizedFetch("POST", "login", {email, password},true)
    if (result?.login === 200) {
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
    const result = await factorizedFetch("GET", `confirmUser/${confirmationCode}`)
    if (result.status !== 200) {
        return false
    } else {
        Navigate("/auth/login")
        return true
    }
}

// getNewConfirmationCode
export const getNewConfirmationCode = async (body) => {
    const {email} = body
    console.log(email);
    await factorizedFetch("POST", "getNewConfirmationCode",{email})
}