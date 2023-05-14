import React, { useState, useContext, Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../utils/context";

const Account = ({ opened }) => {
    const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const handleLogout = async () => {
    await factorizedFetch("GET", "logout", {}, true)
        setIsAuth(false)
    }

    return (
        <div className={`account-container ${isMobile ? "mobile" : ""} ${opened ? "opened" : ""} `}>
            {!isAuth 
            ? <Fragment>
                <div className="account-item">
                    <NavLink to="/login" className="account-link">
                        <span className="account-link-text">Se connecter</span>
                    </NavLink>
                </div>
                <div className="account-item">
                    <NavLink to="/register" className="account-link">
                        <span className="account-link-text">S'inscrire</span>
                    </NavLink>
                </div>
           </Fragment>
           : <Fragment>
                <div className="account-item">
                    <NavLink to="/dashboard" className="account-link">
                        <span className="account-link-text">Tableau de bord</span>
                    </NavLink>
                </div>

                <div className="account-item">
                    <NavLink to="/logout" className="account-link" onClick={handleLogout}>
                        <span className="account-link-text">Se déconnecter</span>
                    </NavLink>
                </div>
            </Fragment>
            }
        </div>
    );
}

export default Account;