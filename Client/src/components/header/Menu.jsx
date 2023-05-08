import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import Account from "./Account";
import { useMediaQuery } from "react-responsive";

const Menu = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
    const [menuToggle, setMenuToggle] = useState(false);

    return (
        <Fragment>

            <div className={`menu-container ${isMobile ? "mobile" : ""} ${menuToggle ? "opened" : ""} `}>

                <div className="menu-item">
                    <NavLink to="/recipe" className="menu-link" activeClassName="menu-link-active">
                        <span className="menu-link-text">Cuisine & Recettes</span>
                    </NavLink>
                </div>

                <div className="menu-item">
                    <NavLink to="/sport-exercise" className="menu-link" activeClassName="menu-link-active">
                        <span className="menu-link-text">Sport & Exercices</span>
                    </NavLink>
                </div>

                <div className="menu-item">
                    <NavLink to="/health" className="menu-link" activeClassName="menu-link-active">
                        <span className="menu-link-text">Santé</span>
                    </NavLink>
                </div>

                <div className="menu-item">
                    <NavLink to="/about" className="menu-link" activeClassName="menu-link-active">
                        <span className="menu-link-text">A propos de nous</span>
                    </NavLink>
                </div>

                {/* // TODO : Add this in the footer component ? */}
                {/* <div className="menu-item">
                    <NavLink to="/contact" className="menu-link" activeClassName="menu-link-active">
                        <span className="menu-link-text">Contact</span>
                    </NavLink>
                </div> */}

                <Account />

            </div>

        </Fragment>

    );
}

export default Menu;












