import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Menu from "./Menu";
import { useMediaQuery } from "react-responsive";

const Header = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
    const [menuToggle, setMenuToggle] = useState(false);

    return (
        <header className="header">
            <div className="header-container">
                <NavLink to="/" className="header-logo">
                    <img src="/images/logos/logo-horizontal-color.png" alt="logo-color" />
                </NavLink>

                <Menu />

                {isMobile ? (
                    <div className={`burger-menu ${menuToggle ? "opened" : ""} `} onClick={() => setMenuToggle(!menuToggle)}>
                        <span className="line line-1" />
                        <span className="line line-2" />
                        <span className="line line-3" />
                    </div>
                ) : null
                }
            </div>
        </header>
    );
};

export default Header;


