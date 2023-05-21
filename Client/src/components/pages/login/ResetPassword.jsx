import { useState } from "react";
import { useParams } from "react-router-dom"
import { resetPassword } from "../../../utils/fetchs/passwordFetch";
import { useMediaQuery } from "react-responsive";
import { CreateInput } from "../../forms/formComponents";

const ResetPassword = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
    const {resetCode} = useParams();
    const [formData, setFormData] = useState({password:"", confirmPassword:""})

    const handleSubmit = async (e) => {
        e.preventDefault();
        await resetPassword(resetCode, formData)
        // TODO : Redirection vers le login
    }

    return(
        <div className={`authForm-container ${isMobile ? "mobile" : ""} `}>

            <div className="form-banner">
                <img src="../images/dashboard/backgrounds/myAccount.jpg" alt="banner" />
            </div>

            <form onSubmit={handleSubmit} className="auth-form">

                <div className="form-title">
                    <h1>Réinitialiser le mot de passe</h1>
                </div>

                <div className="form-fields">
                    <CreateInput inputName={"password"} label="Mot de passe" inputType="password" formData={formData} setFormData={setFormData} />
                    <CreateInput inputName={"confirmPassword"} label="Confirmer le mot de passe" inputType="password" formData={formData} setFormData={setFormData} />
                </div>

                <div className="form-submit">
                    <button type="submit">Confirmer</button>
                </div>

            </form>
        </div>
    )
}

export default ResetPassword;