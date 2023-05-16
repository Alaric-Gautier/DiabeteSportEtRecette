import { createContext, useState } from "react";
import { login, logout } from "./fetchs/connectFetch";


export const AuthContext = createContext();
export const AuthProvider = (props) => {
    const [isAuth, setIsAuth] = useState(false);

    return(
    <AuthContext.Provider value={{
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