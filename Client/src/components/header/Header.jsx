import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <NavLink to="/" className="header-logo">
                    <img src="/images/logos/logo-horizontal-color.png" alt="logo-color" width="400" />
                </NavLink>



            </div>
        </header>
    );
};

export default Header;


