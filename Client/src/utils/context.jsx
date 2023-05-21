import { createContext, useState } from "react";
import factorizedFetch from "./fetchs/factorizedFetch";


export const AuthContext = createContext();
export const AuthProvider = (props) => {
    const [isAuth, setIsAuth] = useState(false);

    const register = async (body) => {
        await factorizedFetch("POST","user/register",body)
    }

    const login = async ({email, password}) => {
        const result = await factorizedFetch("POST", "login", {email, password},true)
        if (result?.status === 200) {
            setIsAuth(true)
        }
    } 
    
    const logout = async (setIsAuth) => {
        setIsAuth(false)
        // await factorizedFetch("GET", "logout", {}, true)
    }
    
    return(
    <AuthContext.Provider value={{
        register,
        login,
        logout,
        isAuth,
        setIsAuth,
    }}>
        {props.children}
    </AuthContext.Provider>
    )
}

export const UserContext = createContext();
export const UserProvider = (props) => {
    const [user, setUser] = useState({})

    return(
        <UserContext.Provider value={{}}>
            {props.children}
        </UserContext.Provider>
    )
}