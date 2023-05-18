import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Menu from "./Menu";
import { useMediaQuery } from "react-responsive";

const Header = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
    const [opened, setOpened] = useState(false);

    const removeOpenedClass = () => {
        console.log("Click");
        if (opened) {
            setOpened(false);
        }
    }

    return (
        <header className="header">
            <div className={`header-container ${isMobile ? "mobile" : ""}`}>
                <NavLink to="/" className="header-logo" onClick={removeOpenedClass}>
                    <img src="/images/logos/logo-horizontal-color.png" alt="logo-color" />
                </NavLink>

                <Menu
                    opened={opened}
                    removeOpenedClass={removeOpenedClass}
                />

                {isMobile ? (
                    <div className={`burger-menu ${opened ? "opened" : ""} `} onClick={() => setOpened(!opened)}>
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


