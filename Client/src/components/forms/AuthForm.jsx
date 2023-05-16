import { useContext, useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { CreateCheckbox, CreateInput } from './formComponents';
import { AuthContext } from '../../utils/context';

const AuthForm = () => {
    const { type } = useParams();
    const [formError, setFormError] = useState(null);
    const [formType, setFormType] = useState(type);
    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        birthDate:"",
        is_diabetic:false,
        diabetes_type:null,
        password:"",
        confirmPassword:""
    });
    const {login, setIsAuth} = useContext(AuthContext)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormError(null);

        try {
            switch (formType) {
                case 'login':
                    await login(formData, setIsAuth);
                    break;
                case 'register':
                    console.log(formData);
                    await registerCustomer(formData);
                    break;
                case 'forgot-password':
                    await forgotPassword(formData);
                    break;
                case 'reset-password':
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

                {formType === "login" && (
                    <>
                        <CreateInput inputName={"email"} label={"Email"} inputType="email" formData={formData} setFormData={setFormData}/>                   
                        <CreateInput inputName={"password"} label={"Mot de passe"} inputType="password" formData={formData} setFormData={setFormData}/>

                        <button type="submit">Connexion</button>

                        <p>
                            Pas de compte ? <NavLink to="/auth/register">Inscrivez-vous ici</NavLink>.
                        </p>
                        <p>
                            <NavLink to="/auth/forgot-password">Mot de passe oublié ? </NavLink>.
                        </p>
                    </>
                )}

                {formType === "register" && (
                    
                    <>
                        <CreateInput inputName={"lastName"} label="Nom" formData={formData} setFormData={setFormData}/>
                        <CreateInput inputName={"firstName"} label="Prénom" formData={formData} setFormData={setFormData}/>
                        <CreateInput inputName={"email"} label="Email" inputType="email" formData={formData} setFormData={setFormData}/>
                        <CreateInput inputName={"birthDate"} label="Date de naissance" inputType="date" formData={formData} setFormData={setFormData}/>
                        <CreateCheckbox inputName={"is_diabetic"} label="Êtes-vous diabétique ?" formData={formData} setFormData={setFormData}/>
                        {formData.is_diabetic && <CreateInput inputName={"diabetes_type"} label="Type de diabète" inputType="email" formData={formData} setFormData={setFormData}/>}
                        <CreateInput inputName={"password"} label="Mot de passe" inputType="password" formData={formData} setFormData={setFormData}/>
                        <CreateInput inputName={"confirmPassword"} label="Confirmer le mot de passe" inputType="password" formData={formData} setFormData={setFormData}/>

                        <button type="submit">Sign Up</button>

                        <p>
                            Vous avez déjà un compte ? <NavLink to="/auth/login">Connectez-vous ici</NavLink>.
                        </p>
                    </>
                )}

                {formType === "forgot-password" && (
                    <>  
                        <CreateInput inputName={"forgotPassword"} label={"Email"} inputType="email" formData={formData} setFormData={setFormData}/>

                        <button type="submit">Réinitialiser le mot de passe</button>
                    </>
                )}

                {formType === "reset-password" && (
                    <>
                        <CreateInput inputName={"password"} label="Mot de passe" inputType="password" formData={formData} setFormData={setFormData}/>
                        <CreateInput inputName={"confirmPassword"} label="Confirmer le mot de passe" inputType="password" formData={formData} setFormData={setFormData}/>

                        <button type="submit">Confirmer</button>
                    </>
                )}
            </form>
        </div>
    );

}

export default AuthForm;