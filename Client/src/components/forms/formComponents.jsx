import { Fragment } from "react";

export const CreateInput = ({inputName, label,formData, setFormData, inputType="text", defaultValue=""}) => {
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    return (
        <Fragment>
            <label htmlFor={inputName}>{label}</label>
            <input 
                type={inputType} 
                id={inputName} 
                name={inputName} 
                value={formData[inputName]}
                onChange={handleInputChange} 
            />
        </Fragment>
    )
}

export const MultipleChoiceInput = ({ inputName, label, formData, setFormData, diabete_type = []}) => {
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    return (
        <Fragment>
            <label htmlFor={inputName}>{label}</label>
            <select
                id={inputName}
                name={inputName}
                value={formData[inputName]}
                onChange={handleInputChange}
            >
                {diabete_type.map((choice, index) => (
                    // TODO Vérifier le selected pour afficher les informations de l'utilisateur
                    <option key={index} selected={formData[inputName] === choice ? true : false} value={choice}>{choice}</option>
                ))}
            </select>
        </Fragment>
    )
}

export const SwitchInput = ({ inputName, label, formData, setFormData}) => {
    const handleInputClick = (event) => {
        const { name, checked } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: checked }));
    };
    return (
        <Fragment>
            <label htmlFor={inputName}>{label}</label>
            <input
                type="checkbox"
                id={inputName}
                name={inputName}
                checked={formData[inputName]}
                onChange={handleInputClick}
                className="switch-input"
            />
        </Fragment>
    )
}

