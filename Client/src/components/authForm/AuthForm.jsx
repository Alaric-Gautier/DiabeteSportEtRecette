import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { CreateCheckbox, CreateInput } from '../formComponents';

function AuthForm(props) {

    const { type } = useParams();
    const [formType, setFormType] = useState(type); // 'login', 'register', or 'forgot-password'
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
    const [formError, setFormError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormError(null);

        try {
            switch (formType) {
                case 'login':
                    await connexion(formData);
                    break;
                case 'register':
                    console.log(formData);
                    await registerCustomer(formData);
                    break;
                case 'forgot-password':
                    await forgotPassword(formData);
                    break;
                case 'register-restaurant':
                    await registerRestaurant(formData);
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

                {formType === 'login' && (
                    <>
                        <CreateInput inputName={"email"} inputType="email" formData={formData} setFormData={setFormData}/>
                    
                        <CreateInput inputName={"password"} inputType="password" formData={formData} setFormData={setFormData}/>

                        <button type="submit">Connexion</button>

                        <p>
                            Pas de compte ? <NavLink to="/auth/register">Inscrivez-vous ici</NavLink>.
                        </p>
                        <p>
                            <NavLink to="/auth/forgot-password">Mot de passe oublié ? </NavLink>.
                        </p>
                    </>
                )}

                {formType === 'register' && (
                    
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

                {formType === 'forgot-password' && (
                    <>
                        <label htmlFor="resetEmail">Email</label>
                        <input type="email" id="resetEmail" name="resetEmail" value={formData.resetEmail} onChange={handleInputChange} />

                        <button type="submit">Reset Password</button>

                        <p>
                            Remember your password? <NavLink to="/auth/login">Log in here</NavLink>
                        </p>
                    </>
                )}

                {formType === 'register-restaurant' && (
                    <>
                        <label htmlFor="resetEmail">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                        <label htmlFor="resetEmail">Téléphone</label>
                        <input type="phone" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                        <button type="submit">Contactez nous</button>


                    </>
                )}
            </form>
            <button onClick={()=>{console.log(formData);}}/>
        </div>
    );

}

export default AuthForm;