import factorizedFetch from "./factorizedFetch";

//* ----- FORGOT PASSWORD FETCH ----- *\\
// forgotPassword
export const sendMailForgotPassword = async (email) => {
    await factorizedFetch("POST", "forgotPassword", { email })
}

// resetPassword
export const resetPassword = async (resetCode, body) => {
    const result = await factorizedFetch("POST", `resetPassword/${resetCode}`, body)
    if (result?.status === 200) {
        return true
    } else {
        return false
    }
}