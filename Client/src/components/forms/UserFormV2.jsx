import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateInput, SwitchInput, MultipleChoiceInput, CreateForm } from './formComponents';
import { updateProfil, deleteAccount, changePassword, getUser } from '../../utils/fetchs/userFetch';
import { useMediaQuery } from 'react-responsive';
import { AuthContext, UserContext } from '../../utils/context';
import { checkAuth } from '../../utils/fetchs/connectFetch';
import { diabetes_types } from '../../utils/datas/datas';
import { deleteAccountForm, myAccountForm, securityForm } from '../../utils/datas/formFields/userFormFields';

export default function UserFormV2() {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
    const { info } = useParams();
    const {user} = useContext(UserContext);
    const {setIsAuth} = useContext(AuthContext)
    const navigate = useNavigate();
    const [inputOptions, setInputOptions] = useState({})
    const [fields, setFields] = useState([])
    const [formData, setFormData] = useState({});

    const setOptionsAndFields = () => {
        switch (info) {
            case 'my-account':
                setInputOptions(myAccountForm.inputOptions);
                setFields(myAccountForm.fields);
                break;
            case 'security':
                setInputOptions(securityForm.inputOptions);
                setFields(securityForm.fields);
                break;
            case 'delete-account':
                setInputOptions(deleteAccountForm.inputOptions);
                setFields(deleteAccountForm.fields);
                break;
            default:
                break;
        }
    }

    const renderForm = () => {
        if (inputOptions && fields) {
            return (
                <CreateForm
                    formType="user"
                    inputOptions={inputOptions}
                    fields={fields}
                    formData={formData && formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    hideInputs={[!formData.is_diabetic && "diabetes_type"]}
                />
            )
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            switch (info) {
                case 'my-account':
                    await updateProfil(formData);
                    break;
                case 'security':
                    await changePassword(formData);
                    break;
                case 'delete-account':
                    await deleteAccount();
                    setIsAuth(false);
                    localStorage.setItem("isAuth", JSON.stringify({isAuth:false}))
                    navigate("/")
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log("Mon erreur est ici ? ", error);
        }
    };

    
    useEffect(() => {
        setOptionsAndFields();
    }, [info])

    useEffect(()=>{
        setFormData({ oldPassword:"", newPassword:"", confirmPassword:"", ...user });
    },[user])

    useEffect(() => {
        checkAuth();
    }, [])

    useEffect(()=>{
        console.log("formData ===", formData);
    }, [formData])


    return (
        <div className={`userForm-container ${isMobile ? "mobile" : ""} `}>

            <form onSubmit={handleSubmit} className="user-form">
                {renderForm()}
            </form>

        </div>
    );

}