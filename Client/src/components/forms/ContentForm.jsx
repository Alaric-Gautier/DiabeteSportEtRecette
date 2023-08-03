import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { recipeForm, sportForm } from "../../utils/datas/formFields/contentFormFields";
import { CreateForm } from "./formComponents";

const ContentForm = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
    const navigate = useNavigate();
    const { type } = useParams();
    const [inputOptions, setInputOptions] = useState({})
    const [fields, setFields] = useState([])
    const [formData, setFormData] = useState({});

    const setOptionsAndFields = () => {
    switch (type) {
        case 'recipes':
            setInputOptions(recipeForm.inputOptions);
            setFields(recipeForm.fields);
            break;
        case 'sport-exercises':
            setInputOptions(sportForm.inputOptions);
            setFields(sportForm.fields);
            break;
        default:
            break;
    }
    }    
    
    const renderForm = () => {
        if (inputOptions && fields) {
            return (
                <CreateForm
                    formType="content"
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
            switch (type) {
                case 'recipes':
                    // TODO mettre fonction de création de recette
                    break;
                case 'sport-exercises':
                    // TODO mettre fonction de création de sport
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setOptionsAndFields();
    }, [type])


    return (
        <div className={`content-container ${isMobile ? "mobile" : ""} `}>
            <div className="content-form">
                <form onSubmit={handleSubmit} className="user-form">
                    {renderForm()}
                </form>
            </div>
        </div>
    );
}

export default ContentForm;