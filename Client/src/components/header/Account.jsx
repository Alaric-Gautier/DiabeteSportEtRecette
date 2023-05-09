import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";

const Account = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
    const menuToggle = useSelector((state) => state.menuToggle.opened);

    return (

        // TODO: Add a condition to display the dashboard button if the user is logged in

        <div className={`account-container ${isMobile ? "mobile" : ""} ${menuToggle ? "opened" : ""} `}>
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
        </div>
    );
}

export default Account;