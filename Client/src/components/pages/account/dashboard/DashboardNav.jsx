import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const DashboardNav = () => {

    return (
        <Fragment>

            <div className="nav-item">
                <NavLink to="/dashboard/my-account" className="nav-link">
                    <img src="/images/dashboard-icons/account.svg" alt="My account" className="nav-link-icon" />
                    <span className="nav-link-text">Mon compte</span>
                </NavLink>
            </div>

            <div className="nav-item">
                <NavLink to="/dashboard/my-recipes" className="nav-link">
                    <img src="/images/dashboard-icons/recipe.svg" alt="My recipes" className="nav-link-icon" />
                    <span className="nav-link-text">Mes recettes</span>
                </NavLink>
            </div>

            <div className="nav-item">
                <NavLink to="/dashboard/my-sport-exercises" className="nav-link">
                    <img src="/images/dashboard-icons/sport.svg" alt="My sport exercises" className="nav-link-icon" />
                    <span className="nav-link-text">Mes exercices de sport</span>
                </NavLink>
            </div>

            <div className="nav-item">
                <NavLink to="/dashboard/delete-account" className="nav-link">
                    <img src="/images/dashboard-icons/delete.svg" alt="Delete account" className="nav-link-icon" />
                    <span className="nav-link-text">Supprimer mon compte</span>
                </NavLink>
            </div>

        </Fragment>
    );
}

export default DashboardNav;