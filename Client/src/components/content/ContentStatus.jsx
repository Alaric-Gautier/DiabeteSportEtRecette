import React, { Fragment, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink, Outlet, useNavigate, useOutlet, useParams } from "react-router-dom";

const ContentStatus = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
    const { type } = useParams();
    const [contentType, setContentType] = useState(type);

    useEffect(() => {
        setContentType(type);
    }, [type]);

    return (

        <div className="nav-item">

            {contentType === "recipes" && (

                <Fragment>

                    <NavLink to="/dashboard/content/recipes/published" className="nav-link">
                        <img src="/images/dashboard/icons/verified.svg" alt="My recipes" className="link-icon" width="30" />
                        <span className="link-text">Recettes publiées</span>
                    </NavLink>

                    <NavLink to="/dashboard/content/recipes/waiting" className="nav-link">
                        <img src="/images/dashboard/icons/unpublished.svg" alt="My sport exercises" className="link-icon" width="30" />
                        <span className="link-text">Recettes en attente de modération</span>
                    </NavLink>

                </Fragment>

            )}

            {contentType === "sport-exercises" && (

                <Fragment>

                    <NavLink to="/dashboard/content/sport-exercises/published" className="nav-link">
                        <img src="/images/dashboard/icons/recipe.svg" alt="My recipes" className="link-icon" width="30" />
                        <span className="link-text">Exercices de sport publiés</span>
                    </NavLink>

                    <NavLink to="/dashboard/content/sport-exercises/waiting" className="nav-link">
                        <img src="/images/dashboard/icons/sport.svg" alt="My sport exercises" className="link-icon" width="30" />
                        <span className="link-text">Exercices de sport en attente de modération</span>
                    </NavLink>

                </Fragment>

            )}

        </div>

    );
}

export default ContentStatus;