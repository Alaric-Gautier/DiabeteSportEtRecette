import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Account from "./Account";
import { useMediaQuery } from "react-responsive";

const Menu = ({ opened }) => {
    const isMobile = useMediaQuery({ query: "(max-width: 576px)" });

    return (
        <Fragment>

            <div className={`menu-container ${isMobile ? "mobile" : ""} ${opened ? "opened" : ""} `}>

                <div className={`container-item ${isMobile ? "mobile" : ""} `}>

                    <div className="menu-item">
                        <NavLink to="/recipe" className="menu-link">
                            <span className="menu-link-text">Cuisine & Recettes</span>
                        </NavLink>
                    </div>

                    <div className="menu-item">
                        <NavLink to="/sport-exercise" className="menu-link">
                            <span className="menu-link-text">Sport & Exercices</span>
                        </NavLink>
                    </div>

                    <div className="menu-item">
                        <NavLink to="/health" className="menu-link" >
                            <span className="menu-link-text">Santé</span>
                        </NavLink>
                    </div>

                    <div className="menu-item">
                        <NavLink to="/about" className="menu-link">
                            <span className="menu-link-text">A propos de nous</span>
                        </NavLink>
                    </div>

                </div>

                {/* // TODO : Add this in the footer component ? */}
                {/* <div className="menu-item">
                    <NavLink to="/contact" className="menu-link" activeClassName="menu-link-active">
                        <span className="menu-link-text">Contact</span>
                    </NavLink>
                </div> */}

            </div>

            <Account
                opened={opened}
            />

        </Fragment>

    );
}

export default Menu;












