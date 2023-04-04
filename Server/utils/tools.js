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

        if (!lowercaseLetterRegex.test(password)) {
            errorCodes.push(1);
        }

        if (!uppercaseLetterRegex.test(password)) {
            errorCodes.push(2);
        }

        if (!digitRegex.test(password)) {
            errorCodes.push(3);
        }

        if (!specialCharacterRegex.test(password)) {
            errorCodes.push(4);
        }

        if (!passwordLengthRegex.test(password)) {
            errorCodes.push(5);
        }

        if (errorCodes.length > 0) {
            throw {
                message: "The password is not valid",
                errorCodes,
            };
        }
    },
    isEmpty: value => {
        if (value === null || value === undefined) {
            return true;
        }
        return false;
    }
};

module.exports = verif;
