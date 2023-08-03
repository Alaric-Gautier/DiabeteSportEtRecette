import { tags } from "../datas"

export const recipeForm = {
    inputOptions:{
        title:"Créer une recette",
        submitButtonText:"Valider",
    },
    fields:[
        { inputName:"title", label:"Titre", inputType:"text"},
        { inputName:"description", label:"Description", inputType:"textArea"},
        { inputName:"duration", label:"Durée", inputType:"multiple", data:[1,2,3,4,5]},
        { inputName:"difficulty", label:"Difficulté", inputType:"multiple", data:[1,2,3,4,5]},
        { inputName:"glycemic_charge", label:"Charge glycémique", inputType:"number"},
        { inputName:"tag", label:"Tags", inputType:"multiple", data:tags},
        { inputName:"is_for_children", label:"Adapté aux enfants ?", inputType:"checkbox"},
    ]
}

export const sportForm = {
    inputOptions:{
        title:"Créer un exercice de sport",
        submitButtonText:"Valider"
    },
    fields:[
        { inputName:"title", label:"Titre", inputType:"text"},
        { inputName:"description", label:"Description", inputType:"textArea"},
        { inputName:"duration", label:"Durée", inputType:"multiple", data:[1,2,3,4,5]},
        { inputName:"difficulty", label:"Difficulté", inputType:"multiple", data:[1,2,3,4,5]},
        { inputName:"is_for_children", label:"Adapté aux enfants ?", inputType:"checkbox"},
    ]
}