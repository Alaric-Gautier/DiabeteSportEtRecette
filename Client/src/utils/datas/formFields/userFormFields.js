import { diabetes_types } from "../datas"

export const myAccountForm = {
    inputOptions:{
        title:"Mon Compte",
        subtitle:"Modifier mes informations",
        submitButtonText:"Mettre à jour"
    },
    fields:[
        { inputName:"firstName", label:"Prénom", inputType:"text" },
        { inputName:"lastName", label:"Nom", inputType:"text"},
        { inputName:"email", label:"Email", inputType:"email" },
        { inputName:"birthDate", label:"Date de naissance", inputType:"date" },
        { inputName:"is_diabetic", label:"Diabétique", inputType:"checkbox" },
        { inputName:"diabetes_type", label:"Type de diabète", inputType:"multiple", data:diabetes_types },
    ]
}

export const securityForm = {
    inputOptions:{
        title:"Sécurité",
        subtitle:"Modifier mon mot de passe",
        submitButtonText:"Changer le mot de passe",
    },
    fields:[
        { inputName:"oldPassword", label:"Mot de passe actuel", inputType:"password" },
        { inputName:"newPassword", label:"Nouveau mot de passe", inputType:"password" },
        { inputName:"confirmPassword", label:"Confirmer le mot de passe", inputType:"password" },
    ]
}

export const deleteAccountForm = {
    inputOptions:{
        title:"Supprimer mon compte",
        submitButtonText:"Confirmer la suppression",
    },
    fields:[
        { inputName:"password", label:"Mot de passe", inputType:"password" },
    ]
}