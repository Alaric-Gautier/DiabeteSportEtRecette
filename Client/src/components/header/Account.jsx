import React, { useState, useContext, Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink, redirect } from "react-router-dom";
import { AuthContext } from "../../utils/context";

const Account = ({ opened, removeOpenedClass }) => {
    const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
    const {logout, isAuth, setIsAuth} = useContext(AuthContext)

    return (
        <div className={`account-container ${isMobile ? "mobile" : ""} ${opened ? "opened" : ""} `}>
            {!isAuth
                ? <Fragment>
                    <div className="account-item">
                        <NavLink to="/auth/login" className="account-link" onClick={removeOpenedClass}>
                            <span className="account-link-text">Se connecter</span>
                        </NavLink>
                    </div>
                    <div className="account-item">
                        <NavLink to="/auth/register" className="account-link" onClick={removeOpenedClass}>
                            <span className="account-link-text">S'inscrire</span>
                        </NavLink>
                    </div>
                </Fragment>
                : <Fragment>
                    <div className="account-item">
                        <NavLink to="/dashboard" className="account-link" onClick={removeOpenedClass}>
                            <span className="account-link-text">Tableau de bord</span>
                        </NavLink>
                    </div>

                <div className="account-item">
                    <NavLink to="/" className="account-link" onClick={()=>logout(setIsAuth)}>
                        <span className="account-link-text">Se déconnecter</span>
                    </NavLink>
                </div>
            </Fragment>
            }
        </div>
    );
}

export default Account;