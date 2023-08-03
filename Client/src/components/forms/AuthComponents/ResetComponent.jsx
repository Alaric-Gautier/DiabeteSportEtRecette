import { useState } from "react";
import { CreateForm } from "../formComponents";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../../utils/fetchs/passwordFetch";

export default function ResetComponent(){
    const navigate = useNavigate();
    const {resetCode} = useParams();
    const [formData, setFormData] = useState({});
    const [inputOptions, setInputOptions] = useState({
        title:"Réinitialiser le mot de passe",
        submitButtonText:"Confirmer",
    });

    const [fields, setFields] = useState([
        { inputName:"password", label:"Mot de passe", inputType:"password" },
        { inputName:"confirmPassword", label:"Confirmer le mot de passe", inputType:"password" }, 
    ]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const resetIsOk = await resetPassword(resetCode, formData);
        if (resetIsOk) {
            navigate("/auth/login")
            window.scrollTo(0, 0)
        }
    };
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
};