import { Fragment } from "react";

export const CreateInput = ({inputName, label,formData, setFormData, inputType="text"}) => {
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

export const CreateCheckbox = ({inputName, label, formData, setFormData}) => {
    const handleInputChange = (event) => {
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
                onChange={handleInputChange} 
            />
        </Fragment>
    )
}

export const CreateDropDown = ({inputName, label, formData, setFormData, selectData}) => {
    const handleInputChange = event => {
        
    }
}