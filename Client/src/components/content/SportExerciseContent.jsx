import React, { Fragment, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink, Outlet, useNavigate, useOutlet } from "react-router-dom";

const SportExerciseContent = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
    //TODO Récupérer les paramètres de l'url
    //TODO Récupérer les infos de l'utilisateur
    //TODO Mapper les recettes de l'utilisateur si il en a
    //TODO Afficher les recettes de l'utilisateur si il en a sinon afficher un message, vous n'avez pas encore de recette si dans l'onglet Publiées
    //TODO Afficher les recettes en attente de validation si dans l'onglet En attente de modération


    return (

        <Fragment>
            {/* <div>
                <NavLink to="/dashboard/content/recipes/create" className="">Créer une recette</NavLink>
            </div> */}
            <div className="recipe-content">

                <div className="content-header">

                    <div className="content-title">
                        <h1>Nom de l'exercice de sport</h1>
                    </div>

                    <div className="content">
                        <div className="content-image">
                            <img src="https://picsum.photos/200/300" alt="Image de la recette" />
                        </div>
                        <div className="content-description">
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. In consequatur officiis eligendi? Nam ea doloremque qui esse eaque totam?</p>
                        </div>
                    </div>

                    <div className="content-footer">

                        <div className="content-tags">
                            <p>Tags</p>
                        </div>

                        <div className="content-actions">
                            {/* //TODO Ajouter l'id du content dans l'url */}
                            <NavLink to="/dashboard/content/sport-exercises/update" className="">Modifier</NavLink>
                            {/* <NavLink to="/dashboard/content/recipes/delete" className="">Supprimer</NavLink> */}
                        </div>

                    </div>

                </div>

            </div>

        </Fragment>

    );
}

export default SportExerciseContent;