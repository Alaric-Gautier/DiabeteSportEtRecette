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

const register = async (body) => {
        await factorizedFetch(`${BASE_URL}/register`, "POST", body)
}

const login = async (body) => {
        await factorizedFetch(`${BASE_URL}/login`,"POST",body,true)
}

const logout = async () => {
    await factorizedFetch(`${BASE_URL}/logout`, "GET", _, true)
}

const confirmUser = async (confirmationCode) => {
    await factorizedFetch(`${BASE_URL}/confirmUser/${confirmationCode}`,"GET")
}

const getNewConfirmationCode = async(body) => {
    await factorizedFetch()
}