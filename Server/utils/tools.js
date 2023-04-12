const { createError } = require("./error");

const verif = {
    validateEmail: email => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            createError("ValidationError", "Le format de l'adresse email est invalide");
        }
    },
    validatePassword: password => {
        const lowercaseLetterRegex = /(?=.*[a-z])/;
        const uppercaseLetterRegex = /(?=.*[A-Z])/;
        const digitRegex = /(?=.*\d)/;
        const specialCharacterRegex = /(?=.*[@$!%+*?&])/;
        const passwordLengthRegex = /^.{8,}$/;

        let errorCodes = [];

        // Verify that the password contains at least 1 lowercase
        if (!lowercaseLetterRegex.test(password)) {
            errorCodes.push(1);
        }

        // Verify that the password contains at least 1 uppercase
        if (!uppercaseLetterRegex.test(password)) {
            errorCodes.push(2);
        }

        // Verify that the password contains at least 1 digit
        if (!digitRegex.test(password)) {
            errorCodes.push(3);
        }

        // Verify that the password contains at least 1 special character
        if (!specialCharacterRegex.test(password)) {
            errorCodes.push(4);
        }

        // Verify that the password contains at least 8 characters
        if (!passwordLengthRegex.test(password)) {
            errorCodes.push(5);
        }

        //If the password doesn't fill the requirements, throw an error with codes
        if (errorCodes.length > 0) {
            createError("ValidationError", "Le mot de passe ne respecte pas les critères de sécurité", errorCodes);
        }
    },
    isEmpty: (...values) => {
        for (const value of values) {
            // check the emptyness of all values
            if (value === null || value === undefined || value === "") {
                createError("ValidationError", "Tous les champs requis doivent être remplis");
            }
        }
    },
    isString: value => {
        // check if the value is a string with only letters
        const stringRegex = /^[a-zA-Z'àâäéèêëîïôöùûüÿÇç', -]+$/;
        if (stringRegex.test(value)) {
            return true;
        }
        return false;
    },
    isNumber: value => {
        // check if the value is a number or empty
        const numberRegex = /^[0-9]*$/;
        if (numberRegex.test(value) || value === null || value === undefined) {
            return true;
        }
        return false;
    },
};

module.exports = verif;
