const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const userService = require("./userService");
const { sendMail, createError } = require("../utils/tools");
const { passwordMatch } = require("../utils/validators");

const forgotPassword = async email => {
    // Create a random Token + Expiration date
    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpires = new Date(Date.now() + 3600 * 1000);

    // Link with the token for the user to reset their password
    const resetLink = `${process.env.URL}/resetPassword/${resetPasswordToken}`;

    // Variable for the mail to send
    const subject = "Réinitialisation du mot de passe";
    const text =
        `Bonjour, \n\nVous recevez cet e-mail car vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n` +
        `Cliquez sur le lien suivant ou collez-le dans votre navigateur pour terminer le processus :\n\n` +
        `${resetLink}` +
        `Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer ce message et votre mot de passe ne sera pas modifié.\n`;
    try {
        await prisma.account.update({
            where: { email },
            data: {
                resetPasswordToken,
                resetPasswordExpires,
            },
        });

        // Send password reset email with the link
        await sendMail(email, subject, text);
    } catch (err) {
        console.error(err);
        createError("Error");
    }
};

const resetPassword = async (token, password, confirmPassword) => {
    passwordMatch(password, confirmPassword);

    // Get user with the matching reset token until it expires
    try {
        const user = await prisma.account.findFirst({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: {
                    gte: new Date(),
                },
            },
        });

        if (!user) {
            createError("notFound", "Le token n'est pas valide ou il a expiré. Veuillez renouveler votre demande");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("user === ", user[0]);
        // Update user's password and reset token in DB
        await prisma.account.update({
            where: { email: user.email },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            },
        });
    } catch (err) {
        console.error(err);
        createError("Error");
    }
};

module.exports = { forgotPassword, resetPassword };
