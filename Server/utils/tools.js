const verif = {
    validateEmail: email => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            throw new Error("Email format is not valid");
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
            throw {
                message: "The password is not valid",
                errorCodes,
            };
        }
    },
    isEmpty: value => {
        // check the emptyness of the value
        if (value === null || value === undefined) {
            return true;
        }
        return false;
    },
};

module.exports = verif;
