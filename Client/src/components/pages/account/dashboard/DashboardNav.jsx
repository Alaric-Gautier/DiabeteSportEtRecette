import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const DashboardNav = () => {

    return (
        <Fragment>

            <div className="dashboard-nav-item">
                <NavLink to="/dashboard/my-account" className="dashboard-nav-link">
                    <span className="dashboard-nav-link-text">Mon compte</span>
                </NavLink>
            </div>

            <div className="dashboard-nav-item">
                <NavLink to="/dashboard/my-recipes" className="dashboard-nav-link">
                    <span className="dashboard-nav-link-text">Mes recettes</span>
                </NavLink>
            </div>

            <div className="dashboard-nav-item">
                <NavLink to="/dashboard/my-sport-exercises" className="dashboard-nav-link">
                    <span className="dashboard-nav-link-text">Mes exercices de sport</span>
                </NavLink>
            </div>

            <div className="dashboard-nav-item">
                <NavLink to="/dashboard/my-favorites" className="dashboard-nav-link">
                    <span className="dashboard-nav-link-text">Mes favoris</span>
                </NavLink>
            </div>

            <div className="dashboard-nav-item">
                <NavLink to="/dashboard/my-reviews" className="dashboard-nav-link">
                    <span className="dashboard-nav-link-text">Mes avis</span>
                </NavLink>
            </div>

        </Fragment>
    );
}

export default DashboardNav;