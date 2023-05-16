import factorizedFetch from "./factorizedFetch";

//* ----- RECIPE FETCH ----- *\\
// recent
export const getRecentRecipes = async () =>{
    await factorizedFetch("GET", "recipe/recent")
}

// getAllRecipes
export const getAllRecipes = async () => {
    await factorizedFetch("GET", "recipe", null, true)
}

// getRecipeById
export const getRecipeById = async (recipeId) => {
    await factorizedFetch("GET", `recipe/${recipeId}`, null, true)
}

// create recipe
export const createRecipe = async (body) => {
    await factorizedFetch("POST", "recipe/create", body, true)
}

// update recipe
export const updateRecipe = async (recipeId, body) =>{
    await factorizedFetch("PUT",`recipe/update/${recipeId}`, body, true)
}

// delete recipe
export const deleteRecipe = async (recipeId) => {
    await factorizedFetch("DELETE", `recipe/delete/${recipeId}`, null, true)
}