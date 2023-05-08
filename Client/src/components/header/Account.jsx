import React from "react";
import { NavLink } from "react-router-dom";

const Account = () => {
    return (

        // TODO: Add a condition to display the dashboard button if the user is logged in

        <div className="account-container">
            <div className="account-item">
                <NavLink to="/login" className="account-link" activeClassName="account-link-active">
                    <span className="account-link-text">Se connecter</span>
                </NavLink>
            </div>

            <div className="account-item">
                <NavLink to="/register" className="account-link" activeClassName="account-link-active">
                    <span className="account-link-text">S'inscrire</span>
                </NavLink>
            </div>
        </div>
    );
}

export default Account;