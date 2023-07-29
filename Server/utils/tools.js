const nodemailer = require("nodemailer");
const { createConfirmationCode, createConfirmationKey, addConfirmationPairToDb } = require("./token");
const ConfirmationPair = require("../models/ConfirmationPair");

const createError = (name, message = "", data = null) => {
    const error = new Error(message);
    error.name = name;
    error.data = data;
    throw error;
};

const sendMail = (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: process.env.SMTP_PORT,
            secure:true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        };

        const info = transporter.sendMail(mailOptions, err => {
            if (err) {
                createError("ErrorSMTP")
            }
        });
        return info;
    } catch (err) {
        console.error(err);
        createError("sendMailError");
    }
};

const sendConfirmationLink = async email => {
    // Prepare the token and link to send to the user to confirm his account
    const confirmationCode = createConfirmationCode(email);
    const confirmationKey = createConfirmationKey();
    const expirationDate = new Date(Date.now() + 600 * 1000);

    const confirmationPair = await ConfirmationPair.findOne({ email });
    
    if (!confirmationCode) {
        createError("mailError", "Une erreur est survenue lors de la création du code de confirmation");
    }

    if (confirmationPair) {
        return createError("Error", "Un lien de confirmation valide vous a déjà été envoyé");
    }

    try {
        await addConfirmationPairToDb(confirmationCode, confirmationKey, email, expirationDate);
    } catch (error) {
        console.error(error);
        createError("Error");
    }

    const confirmationLink = `${process.env.BASE_SERVER_URL}/confirmUser/${confirmationKey}`;

    // Sending the mail
    const subject = "Confirmation de votre compte";
    const text = `Bienvenue sur Diabete Sport & Recettes.\n Cliquez sur le lien suivant pour confirmer votre compte : ${confirmationLink} . \nCe lien est valable 10min.`;

    sendMail(email, subject, text);
    return true;
};

const isUserExists = (user, callback = null) => {
    if (!user) {
        createError("NotFound", "Aucun utilisateur n'a été trouvé");
    } else {
        if (callback) {
            callback();
        }
    }
};

module.exports = { createError, sendMail, sendConfirmationLink, isUserExists };
