import { createContext, useContext, useEffect, useRef, useState } from "react";
import factorizedFetch from "./fetchs/factorizedFetch";
import { getUser } from "./fetchs/userFetch";
import { checkAuth } from "./fetchs/connectFetch";


export const AuthContext = createContext();
export const AuthProvider = (props) => {
    const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem("isAuth"))?.isAuth)

    const register = async (body) => {
        await factorizedFetch("POST", "user/register", body)
    }

    const login = async ({ email, password }) => {
        const result = await factorizedFetch("POST", "login", { email, password }, false)
        if (result?.status === 200) {
            setIsAuth(true)
            return true
        } else {
            return false
        }
    }

    const logout = async () => {
        setIsAuth(false)
        localStorage.setItem("isAuth",JSON.stringify({isAuth:false}))
        await factorizedFetch("GET", "logout", null, true)
    }

    const checkIfUserIsAuthenticated = async () => {
        const authentication = await checkAuth()
        localStorage.setItem("isAuth", JSON.stringify(authentication))
    }

    return (
        <AuthContext.Provider value={{
            register,
            login,
            logout,
            isAuth,
            setIsAuth,
            checkIfUserIsAuthenticated
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const UserContext = createContext();
export const UserProvider = (props) => {
    const [user, setUser] = useState({})
    
    const getUserData = async () => {
        const userData = await getUser();
        setUser(userData);
    }
    
    return (
        <UserContext.Provider value={{
            user,
            getUserData,
        }}>
            {props.children}
        </UserContext.Provider>
    )
}