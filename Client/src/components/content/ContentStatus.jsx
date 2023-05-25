import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import RecipeContent from "./RecipeContent";
import SportExerciseContent from "./SportExerciseContent";

const ContentStatus = () => {
    const { type, status } = useParams();
    console.log(type, status);
    const [contentType, setContentType] = useState(type);
    const navigate = useNavigate();

    const [contentStatus, setContentStatus] = useState(status);

    const [content, setContent] = useState(<RecipeContent />);

    useEffect(() => {
        switch (contentType) {
            case "recipes":
                navigate("/dashboard/content/recipes/published");
                break;
            case "sport-exercises":
                navigate("/dashboard/content/sport-exercises/published");
                break;
            default:
                navigate("/dashboard/content/recipes/published");
                break;
        }
    }, [contentType]);

    // useEffect(() => {
    //     setContentType(type);
    //     setContentStatus(status);
    // }, [type, status]);

    useEffect(() => {
        switch (contentType + "/" + contentStatus) {
            case "recipes/published":
                setContent(<RecipeContent />);
                break;
            case "recipes/waiting":
                setContent(<RecipeContent />);
                break;
            case "sport-exercises/published":
                setContent(<SportExerciseContent />);
                break;
            case "sport-exercises/waiting":
                setContent(<SportExerciseContent />);
                break;
            default:
                setContent(<RecipeContent />);
                break;
        }
    }, [contentType, contentStatus]);



    return (

        <Fragment>

            <div className="nav-item">

                {contentType === "recipes" && (

                    <Fragment>

                        <NavLink to="/dashboard/content/recipes/published" className="nav-link">
                            <img src="/images/dashboard/icons/verified.svg" alt="My recipes" className="link-icon" width="30" />
                            <span className="link-text">Publiées</span>
                        </NavLink>

                        <NavLink to="/dashboard/content/recipes/waiting" className="nav-link">
                            <img src="/images/dashboard/icons/unpublished.svg" alt="My sport exercises" className="link-icon" width="30" />
                            <span className="link-text">En attente de modération</span>
                        </NavLink>

                    </Fragment>

                )}

                {contentType === "sport-exercises" && (

                    <Fragment>

                        <NavLink to="/dashboard/content/sport-exercises/published" className="nav-link">
                            <img src="/images/dashboard/icons/verified.svg" alt="My recipes" className="link-icon" width="30" />
                            <span className="link-text">Publiés</span>
                        </NavLink>

                        <NavLink to="/dashboard/content/sport-exercises/waiting" className="nav-link">
                            <img src="/images/dashboard/icons/unpublished.svg" alt="My sport exercises" className="link-icon" width="30" />
                            <span className="link-text">En attente de modération</span>
                        </NavLink>

                    </Fragment>

                )}

            </div>

            <div className="display-content">

                {content}

            </div>

        </Fragment>

    );
}

export default ContentStatus;