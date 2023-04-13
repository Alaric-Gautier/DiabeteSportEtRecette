const crypto = require("crypto");
const { sendMail } = require("../utils/tools");
const userService = require("./userService");

const forgotPassword = async email => {
    const user = await userService.getUserByMail(email);

    const resetCode = crypto.randomBytes(32).toString("hex");
    const resetLink = `${process.env.URL}/resetPassword/${resetCode}`;

    const subject = "Réinitialisation du mot de passe";
    const text =
        `Bonjour, \n\nVous recevez cet e-mail car vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n` +
        `Cliquez sur le lien suivant ou collez-le dans votre navigateur pour terminer le processus :\n\n` +
        `${resetLink}` +
        `Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer ce message et votre mot de passe ne sera pas modifié.\n`;

    await sendMail(email, subject, text);
};

const resetPassword = async () => {};

module.exports = { forgotPassword, resetPassword };
