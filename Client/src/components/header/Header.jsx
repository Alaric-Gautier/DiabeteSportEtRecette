import React from "react";
import { NavLink } from "react-router-dom";
import Menu from "./Menu";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../store/menu/menuToggle.slice";

const Header = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
    const menuToggle = useSelector((state) => state.menuToggle.opened);
    const dispatch = useDispatch();

    return (
        <header className="header">
            <div className={`header-container ${isMobile ? "mobile" : ""}`}>
                <NavLink to="/" className="header-logo">
                    <img src="/images/logos/logo-horizontal-color.png" alt="logo-color" />
                </NavLink>

                <Menu />

                {isMobile ? (
                    <div className={`burger-menu ${menuToggle ? "opened" : ""} `} onClick={() => dispatch(toggleMenu())}>
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


