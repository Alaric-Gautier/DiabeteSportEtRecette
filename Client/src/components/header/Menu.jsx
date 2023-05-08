import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Account from "./Account";

const Menu = () => {
    return (
        <Fragment>

            <div className="menu-container">

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












