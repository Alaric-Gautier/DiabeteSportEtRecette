import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { CreateCheckbox, CreateInput } from './formComponents';

const UserForm = () => {

    const { type } = useParams();
    const [formType, setFormType] = useState(type);
    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        birthDate:"",
        is_diabetic:false,
        diabetes_type:null,
        oldPassword:"",
        newPassword:"",
        confirmPassword:""
    });
    const [formError, setFormError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormError(null);

        try {
            switch (formType) {
                case 'change-password':
                    await forgotPassword(formData);
                    break;
                default:
                    break;
            }
        } catch (error) {
            setFormError(error.message);
        }
    };

    useEffect(() => {
        setFormError(null);
        setFormData({
            firstName:"",
            lastName:"",
            email:"",
            birthDate:"",
            is_diabetic:false,
            diabetes_type:null,
            password:"",
            confirmPassword:""
        }); 
        setFormType(type)
    }, [type])

    return (
        <div className="authForm-container">
            <form onSubmit={handleSubmit} className="auth-form">
                {formError && <div className="error-message">{formError}</div>}

                {formType === "change-password" && (
                    <>
                        <CreateInput inputName={"oldPassword"} label="Mot de passe actuel" inputType="password" formData={formData} setFormData={setFormData}/>
                        <CreateInput inputName={"newPassword"} label="Nouveau mot de passe" inputType="password" formData={formData} setFormData={setFormData}/>
                        <CreateInput inputName={"confirmPassword"} label="Confirmer le mot de passe" inputType="password" formData={formData} setFormData={setFormData}/>

                        <button type="submit">Changer le mot de passe</button>
                    </>
                )}
            </form>
        </div>
    );

}

export default UserForm;