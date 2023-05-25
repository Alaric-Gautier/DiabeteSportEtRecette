import React, { Fragment, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink, Outlet, useNavigate, useOutlet } from "react-router-dom";

const RecipeContent = () => {
    // const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
    // const outlet = useOutlet();
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (outlet === null) {
    //         navigate("/dashboard/content/recipes/published");
    //     }
    // }, [outlet]);

    return (

        <Fragment>

            <div className="recipe-nav">

                <div className="nav-item">

                    <NavLink to="/dashboard/content/recipes/published" className="nav-link">
                        <img src="/images/dashboard/icons/recipe.svg" alt="My recipes" className="link-icon" width="30" />
                        <span className="link-text">Recettes publiées</span>
                    </NavLink>

                    <NavLink to="/dashboard/content/recipes/waiting" className="nav-link">
                        <img src="/images/dashboard/icons/sport.svg" alt="My sport exercises" className="link-icon" width="30" />
                        <span className="link-text">Recettes en attente de modération</span>
                    </NavLink>

                </div>

            </div>



        </Fragment>

    );
}

export default RecipeContent;