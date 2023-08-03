import { useState } from "react";
import { CreateForm } from "../formComponents";
import { sendMailForgotPassword } from "../../../utils/fetchs/passwordFetch";

export default function ForgotComponent(){
    const [formData, setFormData] = useState({})
    const [inputOptions, setInputOptions] = useState({
        title:"Mot de passe oublié",
        submitButtonText:"Réinitialiser le mot de passe",
        footerText:"Vous vous souvenez de votre mot de passe ?",
        footerLink:{ label:"Connectez-vous ici.", to:"/auth/login" }
    })

    const [fields, setFields] = useState([{ inputName:"forgotPassword", label:"Email", inputType:"email" }])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendMailForgotPassword(formData.forgotPassword);
    }
    
    return(        
    <form onSubmit={handleSubmit} className="auth-form">
        <img className="authForm-logo" src="/images/logos/logo-vertical-color.svg"/>
        <CreateForm 
            formType="auth"
            inputOptions={inputOptions}
            fields={fields}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            />
    </form>
    )
}