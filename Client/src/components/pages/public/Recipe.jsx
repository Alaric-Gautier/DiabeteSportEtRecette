import React from "react";
import DisplayContent from "../../content/DisplayContent";

const Recipe = () => {
    const recipeArray = [
        {
            title:"recette 1",
            description:"Je suis la description de la recette 1",
            ingredients:[
                {
                    name:"ingredient 1",
                    glycemic_index:15,
                    glycemic_charge:20,
                },
                {
                    name:"ingredient 2",
                    glycemic_index:20,
                    glycemic_charge:5,
                },
                {
                    name:"ingredient 3",
                    glycemic_index:18,
                    glycemic_charge:26,
                }
            ]
        },
        
        {
            title:"recette 2",
            description:"Je suis la description de la recette 2",
            ingredients:[
                {
                    name:"ingredient 2",
                    glycemic_index:20,
                    glycemic_charge:5,
                },
                {
                    name:"ingredient 3",
                    glycemic_index:44,
                    glycemic_charge:28,
                },
                {
                    name:"ingredient 8",
                    glycemic_index:2,
                    glycemic_charge:5,
                }
            ]
        },
    ]
    return (
        <div className="recipe">
            <h1>Voici les 5 dernières recettes</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
            <DisplayContent contentType="recipe" contentArray={recipeArray}/>
        </div>
    );
}

export default Recipe;