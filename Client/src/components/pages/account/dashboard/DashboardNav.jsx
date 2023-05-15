import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const DashboardNav = () => {

    return (
        <Fragment>

            <div className="nav-page">

                <div className="nav-item">
                    <NavLink to="/dashboard/my-account" className="nav-link">
                        <img src="/images/dashboard/icons/account.svg" alt="My account" className="link-icon" width="30" />
                        <span className="link-text">Mon compte</span>
                    </NavLink>
                </div>

                <div className="nav-item">
                    <NavLink to="/dashboard/my-recipes" className="nav-link">
                        <img src="/images/dashboard/icons/recipe.svg" alt="My recipes" className="link-icon" width="30" />
                        <span className="link-text">Mes recettes</span>
                    </NavLink>
                </div>

                <div className="nav-item">
                    <NavLink to="/dashboard/my-sport-exercises" className="nav-link">
                        <img src="/images/dashboard/icons/sport.svg" alt="My sport exercises" className="link-icon" width="30" />
                        <span className="link-text">Mes exercices de sport</span>
                    </NavLink>
                </div>

            </div>

            <div className="nav-delete">

                <div className="nav-item">
                    <NavLink to="/dashboard/delete" className="nav-link">
                        <img src="/images/dashboard/icons/delete.svg" alt="Delete account" className="link-icon" />
                        <span className="link-text">Supprimer mon compte</span>
                    </NavLink>
                </div>

            </div>

        </Fragment>
    );
}

export default DashboardNav;