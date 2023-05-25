import React, { Fragment, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink, Outlet, useNavigate, useOutlet } from "react-router-dom";

const Content = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
    const outlet = useOutlet();
    const navigate = useNavigate();

    useEffect(() => {
        if (outlet === null) {
            navigate("/dashboard/content/recipes");
        }
    }, [outlet]);

    return (
        <div className="content-container">

            <div className="content-type-nav">

                <div className="nav-item">

                    <NavLink to="/dashboard/content/recipes" className="nav-link">
                        <img src="/images/dashboard/icons/recipe.svg" alt="My recipes" className="link-icon" width="30" />
                        <span className="link-text">Mes recettes</span>
                    </NavLink>

                    <NavLink to="/dashboard/content/sport-exercises" className="nav-link">
                        <img src="/images/dashboard/icons/sport.svg" alt="My sport exercises" className="link-icon" width="30" />
                        <span className="link-text">Mes exercices de sport</span>
                    </NavLink>

                </div>

            </div>

            <div className="content-status-nav">
                <Outlet />
            </div>

        </div>
    );
}

export default Content;