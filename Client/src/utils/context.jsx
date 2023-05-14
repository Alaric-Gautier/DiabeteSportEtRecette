import { createContext, useState } from "react";
import factorizedFetch from "./factorizedFetch";


export const AuthContext = createContext();
export const AuthProvider = (props) => {
    const [isAuth, setIsAuth] = useState(false);

// login
const login = async (body) => {
    await factorizedFetch("POST", "login", body,true)
    setIsAuth(true)
}

    return(
    <AuthContext.Provider value={{
        login,
        isAuth
    }}>
        {props.children}
    </AuthContext.Provider>
    )
}