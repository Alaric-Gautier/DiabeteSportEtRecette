import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import RecipeContent from "./RecipeContent";
import SportExerciseContent from "./SportExerciseContent";
import ContentHeader from "./ContentHeader";
import ContentForm from "../forms/ContentForm";

const ContentStatusV2 = () => {
    const { type, status } = useParams();
    const [contentType, setContentType] = useState(type);
    const navigate = useNavigate();

    const [contentStatus, setContentStatus] = useState(status);

    const [content, setContent] = useState(<RecipeContent />);

    const renderForm = () => {
        switch (contentType) {
            case "recipes":
                if (status === "create") {
                    return(<ContentForm/>)
                } else {
                    return(<RecipeContent />);
                }
            case "sport-exercises":
                if (status === "create") {
                    return(<ContentForm/>)
                } else {
                    return(<SportExerciseContent />);
                }
            default:
                return(<ContentForm />);
        }
    }

    useEffect(() => {
        switch (contentType) {
            case "recipes":
                navigate("/dashboard/content/recipes/create");
                break;
            case "sport-exercises":
                navigate("/dashboard/content/sport-exercises/create");
                break;
            default:
                navigate("/dashboard/content/recipes/create");
                break;
        }
    }, [contentType]);

    return (

        <Fragment>
            <ContentHeader contentType={contentType}/>

            <div className="display-content">

                {renderForm()}

            </div>

        </Fragment>

    );
}

export default ContentStatusV2;