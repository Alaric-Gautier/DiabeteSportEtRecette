import factorizedFetch from "./factorizedFetch";

//* ----- FORGOT PASSWORD FETCH ----- *\\
// forgotPassword
export const sendMailForgotPassword = async (email) => {
    // TODO - Vérifier la récupération de l'email. Actuellement undefined
    console.log(email);
    await factorizedFetch("POST", "forgotPassword", {email})
}

// resetPassword
export const resetPassword = async (resetCode, body) => {
    await factorizedFetch("POST", `resetPassword/${resetCode}`, body)
}