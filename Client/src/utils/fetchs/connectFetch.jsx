import factorizedFetch from "./factorizedFetch";

// confirmUser
export const confirmUser = async (confirmationCode) => {
    const result = await factorizedFetch("GET", `confirmUser/${confirmationCode}`)
    if (result.status !== 200) {
        return false
    } else {
        // TODO : Redirection vers le login
        // Navigate("/auth/login")
        return true
    }
}

// getNewConfirmationCode
export const getNewConfirmationCode = async (body) => {
    const {email} = body
    console.log(email);
    await factorizedFetch("POST", "getNewConfirmationCode",{email})
}