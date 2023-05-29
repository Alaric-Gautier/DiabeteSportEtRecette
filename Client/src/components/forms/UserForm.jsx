import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreateInput, SwitchInput, MultipleChoiceInput } from './formComponents';
import { updateProfil, deleteAccount, changePassword, getUser } from '../../utils/fetchs/userFetch';
import { useMediaQuery } from 'react-responsive';
import { UserContext } from '../../utils/context';

const UserForm = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
    const { info } = useParams();
    const { user } = useContext(UserContext);
    const [formInfo, setFormInfo] = useState(info);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        is_diabetic: false,
        diabetes_type: null,
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [formError, setFormError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormError(null);

        try {
            switch (formInfo) {
                case 'my-account':
                    await updateProfil(formData);
                    break;
                case 'security':
                    await changePassword(formData);
                    break;
                case 'delete-account':
                    //TODO Add redirection to home page
                    await deleteAccount(formData);
                    break;
                default:
                    break;
            }
        } catch (error) {
            setFormError(error.message);
        }
    };

    const formateDatetoISO = (date) => {
        const newDate = new Date(date)
        console.log(newDate);
        // return dateUTC.toISOString().substring(0,10);
    }

    useEffect(() => {
        setFormError(null);
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            birthDate: "",
            is_diabetic: false,
            diabetes_type: null,
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
        setFormInfo(info)
    }, [info])

    useEffect(() => {
        setFormData(user)
    }, [user])
    const diabetes_types = [
        "Type 1",
        "Type 2",
        "Gestationnel",
    ];

    return (
        <div className={`userForm-container ${isMobile ? "mobile" : ""} `}>

            <form onSubmit={handleSubmit} className="user-form">

                {formError && <div className="error-message">{formError}</div>}

                {formInfo === "my-account" && (

                    <Fragment>

                        <div className="user-form-title">
                            <h1>Mon compte</h1>
                            <p>Modifier mes informations</p>
                        </div>

                        <div className="user-form-fields">
                            <CreateInput inputName={"firstName"} label="Prénom" formData={formData} setFormData={setFormData} />
                            <CreateInput inputName={"lastName"} label="Nom" formData={formData} setFormData={setFormData} />
                            <CreateInput inputName={"email"} label="Email" inputType="email" formData={formData} setFormData={setFormData} />
                            <CreateInput inputName={"birthDate"} label="Date de naissance" inputType="date" formData={formData} setFormData={setFormData} />
                            <SwitchInput inputName={"is_diabetic"} label="Diabétique" formData={formData} setFormData={setFormData} />
                            {formData.is_diabetic && (
                                <MultipleChoiceInput inputName={"diabetes_type"} label="Type de diabète" formData={formData} setFormData={setFormData} diabete_type={diabetes_types} />
                            )}
                        </div>

                        <div className="user-form-submit">
                            <button type="submit">Mettre à jour</button>
                        </div>

                    </Fragment>

                )}

                {formInfo === "security" && (

                    <Fragment>

                        <div className="user-form-title">
                            <h1>Sécurité</h1>
                            <p>Modifier mon mot de passe</p>
                        </div>

                        <div className="user-form-fields">
                            <CreateInput inputName={"oldPassword"} label="Mot de passe actuel" inputType="password" formData={formData} setFormData={setFormData} />
                            <CreateInput inputName={"newPassword"} label="Nouveau mot de passe" inputType="password" formData={formData} setFormData={setFormData} />
                            <CreateInput inputName={"confirmPassword"} label="Confirmer le mot de passe" inputType="password" formData={formData} setFormData={setFormData} />
                        </div>

                        <div className="user-form-submit">
                            <button type="submit">Changer le mot de passe</button>
                        </div>

                    </Fragment>

                )}

                {formInfo === "delete-account" && (

                    <Fragment>

                        <div className="user-form-title">
                            <h1>Supprimer mon compte</h1>
                        </div>

                        <div className="user-form-fields">
                            <CreateInput inputName={"password"} label="Mot de passe" inputType="password" formData={formData} setFormData={setFormData} />
                        </div>

                        <div className="user-form-submit">
                            <button type="submit">Supprimer mon compte</button>
                        </div>

                    </Fragment>

                )}

            </form>

        </div>
    );

}

export default UserForm;