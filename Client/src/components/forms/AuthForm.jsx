import { Fragment, useContext, useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { CreateCheckbox, CreateInput } from './formComponents';
import FormError from '../error/error';
import { AuthContext } from '../../utils/context';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import { toastUtils } from '../../utils/toaster';

const AuthForm = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
    const { type } = useParams();
    const [formError, setFormError] = useState(null);
    const [formType, setFormType] = useState(type);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        is_diabetic: false,
        diabetes_type: null,
        password: "",
        confirmPassword: ""
    });
    const {register, login, setIsAuth} = useContext(AuthContext)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormError(null);

        // try {
            switch (formType) {
                case 'login':
                    await login(formData, setIsAuth);
                    break;
                case 'register':
                    await register(formData);
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
        // } catch (error) {
        //     toastUtils("error", error.message)
        //     setFormError(error);
        // }
    };

    useEffect(() => {
        setFormError(null);
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            birthDate: "",
            is_diabetic: false,
            diabetes_type: "",
            password: "",
            confirmPassword: ""
        });
        setFormType(type)
    }, [type])

    return (
        <div className={`authForm-container ${isMobile ? "mobile" : ""} `}>

            <div className="form-banner">
                <img src="/images/dashboard/backgrounds/myAccount.jpg" alt="banner" />
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
                {/* {formError && <div className="error-message">{formError.message}</div>} */}

                {formType === "login" && (
                    <>
                        <h1>Connexion</h1>

                        <CreateInput inputName={"email"} label={"Email"} inputType="email" formData={formData} setFormData={setFormData} />
                        <CreateInput inputName={"password"} label={"Mot de passe"} inputType="password" formData={formData} setFormData={setFormData} />

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

                    <Fragment>

                        <div className="form-title">
                            <h1>Inscription</h1>
                        </div>

                        <div className="form-fields">
                            <CreateInput inputName={"lastName"} label="Nom" formData={formData} setFormData={setFormData} />
                            <CreateInput inputName={"firstName"} label="Prénom" formData={formData} setFormData={setFormData} />
                            <CreateInput inputName={"email"} label="Email" inputType="email" formData={formData} setFormData={setFormData} />
                            <CreateInput inputName={"birthDate"} label="Date de naissance" inputType="date" formData={formData} setFormData={setFormData} />
                            <CreateCheckbox inputName={"is_diabetic"} label="Êtes-vous diabétique ?" formData={formData} setFormData={setFormData} />
                            {formData.is_diabetic && <CreateInput inputName={"diabetes_type"} label="Type de diabète" inputType="email" formData={formData} setFormData={setFormData} />}
                            <CreateInput inputName={"password"} label="Mot de passe" inputType="password" formData={formData} setFormData={setFormData} />
                            <CreateInput inputName={"confirmPassword"} label="Confirmer le mot de passe" inputType="password" formData={formData} setFormData={setFormData} />
                        </div>

                        <div className="form-submit">
                            <button type="submit">S'inscrire</button>
                        </div>

                        <div className="form-footer">
                            <p>Vous avez déjà un compte ?</p> <NavLink to="/auth/login">Connectez-vous ici.</NavLink>
                        </div>

                    </Fragment>
                )}

                {formType === "forgot-password" && (
                    <>
                        <CreateInput inputName={"forgotPassword"} label={"Email"} inputType="email" formData={formData} setFormData={setFormData} />

                        <button type="submit">Réinitialiser le mot de passe</button>
                    </>
                )}

                {formType === "reset-password" && (
                    <>
                        <CreateInput inputName={"password"} label="Mot de passe" inputType="password" formData={formData} setFormData={setFormData} />
                        <CreateInput inputName={"confirmPassword"} label="Confirmer le mot de passe" inputType="password" formData={formData} setFormData={setFormData} />

                        <button type="submit">Confirmer</button>
                    </>
                )}

            </form>

        </div >
    );

}

export default AuthForm;