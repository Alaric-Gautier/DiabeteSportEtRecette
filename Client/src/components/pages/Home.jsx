import React from "react";
import { useMediaQuery } from "react-responsive";

const Home = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 576px)" });

    return (
        <div className={`home ${isMobile ? "mobile" : ""}`}>
            <h1>Bienvenu sur le site Diabète Sport & Recettes !</h1>
            <div className="columns">
                <div className="column">
                    <div className="recipe">
                        <h2>Recette du jour</h2>
                        <p>Voici une délicieuse recette pour votre prochain repas :</p>
                        <ul>
                            <li>Ingrédient 1</li>
                            <li>Ingrédient 2</li>
                            <li>Ingrédient 3</li>
                        </ul>
                    </div>
                </div>
                <div className="column">
                    <div className="exercise">
                        <h2>Exercice du jour</h2>
                        <p>Voici un exercice pour vous maintenir en forme :</p>
                        <ul>
                            <li>Exercice 1</li>
                            <li>Exercice 2</li>
                            <li>Exercice 3</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;