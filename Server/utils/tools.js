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
            service: process.env.SERVICE,
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

        const info = transporter.sendMail(mailOptions, err => console.error(err));
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
    console.log("ConfirmationPair dans sendConfirmationLink", confirmationPair);
    if (confirmationPair) {
        return createError("Error", "Un lien de confirmation valide vous a déjà été envoyé");
    }

    try {
        await addConfirmationPairToDb(confirmationCode, confirmationKey, email, expirationDate);
    } catch (error) {
        console.error(error);
        createError("Error");
    }

    const confirmationLink = `http://localhost:5173/confirmUser/${confirmationKey}`;
    // const confirmationLink = `http://localhost:8000/confirmUser/${confirmationCode}`;

    if (!confirmationCode) {
        createError("mailError", "Une erreur est survenue lors de la création du code de confirmation");
    }

    // Sending the mail
    const subject = "Confirmation de votre compte";
    const text = `Bienvenue sur Diabete Sport & Recettes.\n Cliquez sur le lien suivant pour confirmer votre compte : ${confirmationLink}. \nCe lien est valable 10min.`;

    sendMail(email, subject, text);
    return true;
};

const isUserExists = user => {
    if (!user) {
        createError("NotFound", "Aucun utilisateur n'a été trouvé");
    }
};

module.exports = { createError, sendMail, sendConfirmationLink, isUserExists };
