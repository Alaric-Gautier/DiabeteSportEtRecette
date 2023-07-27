import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext, UserContext } from "../../utils/context";
import DashboardLayout from "./DashboardLayout";
import { Navigate } from "react-router-dom";

export default function CheckAuthComponent(props) {
    const {isAuth, checkIfUserIsAuthenticated} = useContext(AuthContext);
    const {getUserData} = useContext(UserContext)

    useEffect(() => {
        getUserData();
        checkIfUserIsAuthenticated(); 
    },[])

    return (
        <Fragment>
            {isAuth ? <DashboardLayout/> : <Navigate to="/auth/login"/>}
        </Fragment>
    )
}