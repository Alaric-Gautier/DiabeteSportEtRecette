import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { CreateCheckbox, CreateInput } from './formComponents';
// import FormError from '../error/error';
import { AuthContext } from '../../utils/context';
import { useMediaQuery } from 'react-responsive';
import { sendMailForgotPassword } from '../../utils/fetchs/passwordFetch';

const AuthForm = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
    const navigate = useNavigate();
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
    const { register, login } = useContext(AuthContext)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormError(null);

        // try {
        switch (formType) {
            case 'login':
                const loggedIn = await login(formData)
                if (loggedIn) {
                    navigate("/dashboard/my-account")
                    window.scrollTo(0, 0)
                }
                break;
            case 'register':
                await register(formData);
                break;
            case 'forgot-password':
                await sendMailForgotPassword(formData.forgotPassword);
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

                <div className="authForm-logo">
                    <img src="/images/logos/logo-vertical-color.svg" alt="logo" />
                </div>
                {/* {formError && <div className="error-message">{formError.message}</div>} */}

                {formType === "login" && (

                    <Fragment>

                        <div className="form-title">
                            <h1>Connexion</h1>
                        </div>

                        <div className="form-fields">
                            <CreateInput inputName={"email"} label={"Email"} inputType="email" formData={formData} setFormData={setFormData} />
                            <CreateInput inputName={"password"} label={"Mot de passe"} inputType="password" formData={formData} setFormData={setFormData} />
                        </div>

                        <div className="form-submit">
                            <button type="submit">Connexion</button>
                        </div>

                        <div className="form-footer">
                            <p>Pas de compte ?</p><NavLink to="/auth/register">Inscrivez-vous ici.</NavLink>

                            <NavLink to="/auth/forgot-password">Mot de passe oublié ? </NavLink>
                        </div>

                    </Fragment>
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

                    <Fragment>

                        <div className="form-title">
                            <h1>Mot de passe oublié</h1>
                        </div>

                        <div className="form-fields">
                            <CreateInput inputName={"forgotPassword"} label={"Email"} inputType="email" formData={formData} setFormData={setFormData} />
                        </div>

                        <div className="form-submit">
                            <button type="submit">Réinitialiser le mot de passe</button>
                        </div>

                        <div className="form-footer">
                            <p>Vous vous souvenez de votre mot de passe ?</p><NavLink to="/auth/login">Connectez-vous ici.</NavLink>
                        </div>

                    </Fragment>
                )}

                {formType === "reset-password" && (

                    <Fragment>

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

                    </Fragment>
                )}

            </form>

        </div >
    );

}

export default AuthForm;