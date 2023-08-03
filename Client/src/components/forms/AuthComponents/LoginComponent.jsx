import { useContext, useState } from "react";
import { CreateForm } from "../formComponents";
import { AuthContext } from "../../../utils/context";
import { useNavigate } from "react-router-dom";

export default function LoginComponent(){
    const navigate = useNavigate();
    const {login} = useContext(AuthContext)
    const [formData, setFormData] = useState({})
    const [inputOptions, setInputOptions] = useState({
        title:"Connexion",
        submitButtonText:"Connexion",
        footerText:"Pas de compte ?",
        footerLink:[
            { label:"Inscrivez-vous ici.", navigate:"/auth/register" },
            { label:"Mot de passe oublié ?", to:"/auth/forgot-password" }
        ]
    })

    const [fields, setFields] = useState([
        { inputName:"email", label:"Email", inputType:"email"},
        { inputName:"password", label:"Mot de passe", inputType:"password" },
    ])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("login", formData);
        const loggedIn = await login(formData);
        if (loggedIn) {
            navigate("/dashboard/my-account");
            window.scrollTo(0, 0);
        }
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