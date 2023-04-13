const nodemailer = require("nodemailer");

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

module.exports = { createError, sendMail };
