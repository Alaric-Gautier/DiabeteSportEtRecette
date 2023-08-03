import { diabetes_types } from "../datas"

export const loginForm = {
    inputOptions:{
        title:"Connexion",
        submitButtonText:"Connexion",
        footerText:"Pas de compte ?",
        footerLink:[
            { label:"Inscrivez-vous ici.", navigate:"/auth/register" },
            { label:"Mot de passe oublié ?", to:"/auth/forgot-password" }
        ]
    },
    fields:[
        { inputName:"email", label:"Email", inputType:"email"},
        { inputName:"password", label:"Mot de passe", inputType:"password" },
    ]
}

export const registerForm = {
    inputOptions:{
        title:"Inscription",
        submitButtonText:"S'inscrire",
        footerText:"Vous avez déjà un compte ?",
        footerLink: { label:"Connectez-vous ici.",  to:"/auth/login" }
    },
    fields:[
        { inputName:"firstName", label:"Prénom", inputType:"text"},
        { inputName:"lastName", label:"Nom", inputType:"text"},
        { inputName:"email", label:"Email", inputType:"email" },
        { inputName:"birthDate", label:"Date de naissance", inputType:"date" },
        { inputName:"is_diabetic", label:"Diabétique", inputType:"checkbox" },
        { inputName:"diabetes_type", label:"Type de diabète", inputType:"multiple", data:diabetes_types },
        { inputName:"password", label:"Mot de passe", inputType:"password" },
        { inputName:"confirmPassword", label:"Confirmer le mot de passe", inputType:"password" },  
    ]
}

export const forgotPasswordForm = {
    inputOptions:{
        title:"Mot de passe oublié",
        submitButtonText:"Réinitialiser le mot de passe",
        footerText:"Vous vous souvenez de votre mot de passe ?",
        footerLink:{ label:"Connectez-vous ici.", to:"/auth/login" }
    },
    fields:[{ inputName:"forgotPassword", label:"Email", inputType:"email" }]
}

export const resetPasswordForm = {
    inputOptions:{
        title:"Réinitialiser le mot de passe",
        submitButtonText:"Confirmer",
    },
    fields:[
        { inputName:"password", label:"Mot de passe", inputType:"password" },
        { inputName:"confirmPassword", label:"Confirmer le mot de passe", inputType:"password" }, 
    ]
}