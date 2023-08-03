import { useContext, useState } from "react";
import { CreateForm } from "../formComponents";
import { diabetes_types } from "../../../utils/datas/datas";
import { AuthContext } from "../../../utils/context";

export default function RegisterComponent(){
    const {register} = useContext(AuthContext)
    const [formData, setFormData] = useState({})
    const [inputOptions, setInputOptions] = useState({
        title:"Inscription",
        submitButtonText:"S'inscrire",
        footerText:"Vous avez déjà un compte ?",
        footerLink: { label:"Connectez-vous ici.",  to:"/auth/login" }
    })

    const [fields, setFields] = useState([
        { inputName:"firstName", label:"Prénom", inputType:"text"},
        { inputName:"lastName", label:"Nom", inputType:"text"},
        { inputName:"email", label:"Email", inputType:"email" },
        { inputName:"birthDate", label:"Date de naissance", inputType:"date" },
        { inputName:"is_diabetic", label:"Diabétique", inputType:"checkbox" },
        { inputName:"diabetes_type", label:"Type de diabète", inputType:"multiple", data:diabetes_types },
        { inputName:"password", label:"Mot de passe", inputType:"password" },
        { inputName:"confirmPassword", label:"Confirmer le mot de passe", inputType:"password" },  
    ])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("register", formData);
        await register(formData);
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
                 hideInputs={[!formData.is_diabetic && "diabetes_type"]}
             />
        </form>
    )
}