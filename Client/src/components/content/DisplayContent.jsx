import { useMediaQuery } from "react-responsive";
import ContentLayout from "./ContentLayout";
import { useEffect } from "react";

export default function DisplayContent ({contentType, contentArray, handleResearch}) {
    const isMobile = useMediaQuery({ query: "(max-width: 576px)" });

    const renderRecipe = (content) => {
        return (
            content.map(el => {
                return(
                    <ContentLayout content={el}>
                        <ul>
                            {el?.ingredients?.map(ingredient=> <li>{ingredient.name}</li>)}
                        </ul>
                    </ContentLayout>

                );
            })
        )
    }

    const renderSport = (content) => {
        return(
            <ContentLayout>
                {content.is_for_children ? <p>Adapté aux enfants</p> : null}
            </ContentLayout>
        );
    }
    
    return(
        <div className={`home ${isMobile ? "mobile" : ""}`}>
            {contentType === "recipe" ? renderRecipe(contentArray) : renderSport(contentArray)}
        </div>

    );
};