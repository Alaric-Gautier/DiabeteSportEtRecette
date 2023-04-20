const nodemailer = require("nodemailer");
const { createConfirmationCode } = require("./token");

const createError = (name, message = "", data = null) => {
    const error = new Error(message);
    error.name = name;
    error.data = data;
    throw error;
};

const sendMail = async (to, subject, text) => {
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

        const info = await transporter.sendMail(mailOptions, err => console.log(err));
        console.log("fonction sendMail === ", info);
        return info;
    } catch (err) {
        console.error(err);
        createError("sendMailError");
    }
};

const sendConfirmationLink = async email => {
    // Prepare the token and link to send to the user to confirm his account
    const confirmationCode = createConfirmationCode(email);
    const confirmationLink = `http://localhost:8000/confirmUser/${confirmationCode}`;

    if (!confirmationCode) {
        createError("mailError", "Une erreur est survenue lors de la création du code de confirmation");
    }

    // Sending the mail
    const subject = "Confirmation de votre compte";
    const text = `Bienvenue sur Diabete Sport & Recettes.\n Cliquez sur le lien suivant pour confirmer votre compte : ${confirmationLink}. \nCe lien est valable 10min.`;

    await sendMail(email, subject, text);
};

const getContentName = type => {
    switch (type) {
        case "sport_exercise":
            return "exercice de sport";
        case "recipe":
            return "recette";
        case "review":
            return "avis";
        default:
            return "contenu";
    }
};

const isUserExists = user => {
    if (!user) {
        createError("NotFound", "Aucun utilisateur n'a été trouvé");
    }
};

module.exports = { createError, sendMail, sendConfirmationLink, isUserExists, getContentName };
