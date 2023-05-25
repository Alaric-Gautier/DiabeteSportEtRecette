import React, { Fragment, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink, Outlet, useNavigate, useOutlet } from "react-router-dom";

const RecipeContent = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

    return (
        <h1>
            RecipeContent
        </h1>
    );
}

export default RecipeContent;