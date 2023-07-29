const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const userService = require("./userService");
const { sendMail, createError } = require("../utils/tools");
const { passwordMatch, validatePassword, isEmpty } = require("../utils/validators");

const forgotPassword = async email => {
    isEmpty(email);

    // Create a random Token + Expiration date
    const reset_password_token = crypto.randomBytes(32).toString("hex");
    const reset_password_expires = new Date(Date.now() + 3600 * 1000);

    // Link with the token for the user to reset their password
    const resetLink = `${process.env.BASE_CLIENT_URL}/auth/reset-password/${reset_password_token}`;

    // Variable for the mail to send
    const subject = "Réinitialisation du mot de passe";
    const text =
        `Bonjour, \n\nVous recevez cet e-mail car vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n` +
        `Cliquez sur le lien suivant ou collez-le dans votre navigateur pour terminer le processus :\n\n` +
        `${resetLink}\n\n` +
        `Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer ce message et votre mot de passe ne sera pas modifié.\n`;
    try {
        await prisma.account.update({
            where: { email },
            data: {
                reset_password_token,
                reset_password_expires,
            },
        });

        // Send password reset email with the link
        sendMail(email, subject, text);
    } catch (err) {
        if (err.code !== "P2025") {
            console.error(err);
            createError("Error");
        }
    }
};

const resetPassword = async (token, password, confirmPassword) => {
    // check if all required fields are filled with isEmpty function
    isEmpty(password, confirmPassword);

    // confirm the password
    passwordMatch(password, confirmPassword);

    // check if password has at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
    validatePassword(password);

    // Get user with the matching reset token until it expires
    const user = await prisma.account.findFirst({
        where: {
            reset_password_token: token,
            reset_password_expires: {
                gte: new Date(),
            },
        },
    });

    if (!user) {
        createError("NotFound", "Le token n'est pas valide ou il a expiré. Veuillez renouveler votre demande");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password and reset token in DB
    try {
        await prisma.account.update({
            where: { email: user.email },
            data: {
                password: hashedPassword,
                reset_password_token: null,
                reset_password_expires: null,
            },
        });
    } catch (err) {
        console.error(err);
        createError("Error");
    }
};

module.exports = { forgotPassword, resetPassword };
