import factorizedFetch from "./factorizedFetch";

//* ----- FORGOT PASSWORD FETCH ----- *\\
// forgotPassword
export const sendMailForgotPassword = async (body) => {
    await factorizedFetch("POST", "forgotPassword", body)
}

// resetPassword
export const resetPassword = async (resetCode, body) => {
    await factorizedFetch("POST", `resetPassword/${resetCode}`, body)
}