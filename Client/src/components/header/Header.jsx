import React from "react";
import { NavLink } from "react-router-dom";
import Menu from "./Menu";

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <NavLink to="/" className="header-logo">
                    <img src="/images/logos/logo-horizontal-color.png" alt="logo-color" />
                </NavLink>

                <Menu />

                {/* //TODO add burger menu here */}

            </div>
        </header>
    );
};

export default Header;


