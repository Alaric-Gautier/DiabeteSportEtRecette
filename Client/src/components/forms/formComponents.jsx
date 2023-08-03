import { Fragment } from "react";

import React from 'react';
import { NavLink } from "react-router-dom";

export const CreateForm = ({formType, inputOptions, fields, formData, setFormData, handleSubmit, hideInputs=[] }) => {
    const {title, subtitle, submitButtonText, footerText, footerLink} = inputOptions;
    const selectInput = (field, key) => {
    switch (field.inputType) {
        case "checkbox" :
            return <SwitchInput key={key} field={field} formData={formData} setFormData={setFormData}/>
        case "multiple":
           return <MultipleChoiceInput key={key} field={field} formData={formData} setFormData={setFormData}/>
        default:
            return <CreateInput key={key} field={field} formData={formData} setFormData={setFormData}/>
    }
  }

  return (
    <Fragment>
      <div className={`${formType}-form-title`}>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className={`${formType}-form-fields`}>

        {fields.map((field, index) => (
                !hideInputs.includes(field.inputName) && selectInput(field, index)
            )
        )}

      </div>

      <div className={`${formType}-form-submit`}>
        <button type="submit" onClick={handleSubmit}>
          {submitButtonText}
        </button>
      </div>

      <div className={`${formType}-form-footer`}>
        <p>{footerText && footerText}</p>
        {!footerLink 
            ? null 
            : Array.isArray(footerLink) 
                ? footerLink.map((link, index) => <NavLink key={index} to={link.to}>{link.label}</NavLink>)
                : <NavLink to={footerLink.to}>{footerLink.label}</NavLink>}
      </div>
    </Fragment>
  );
};



export const CreateInput = ({field,formData, setFormData, defaultValue=""}) => {
    const {inputName, label, inputType, maxLength=null} = field;
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
                maxLength={maxLength}
            />
        </Fragment>
    )
}

export const MultipleChoiceInput = ({ field, formData, setFormData}) => {
    const {inputName, label, data=[]} = field;
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
                {data.map((choice, index) => (
                    <option key={index} selected={formData[inputName] === choice ? true : false} value={choice}>{choice}</option>
                ))}
            </select>
        </Fragment>
    )
}

export const SwitchInput = ({ field, formData, setFormData}) => {
    const {inputName, label} = field;
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

