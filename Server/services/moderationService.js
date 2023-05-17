const { PrismaClient } = require("@prisma/client");
const { createError, sendMail } = require("../utils/tools");
const { getUserByContentId } = require("./userService");
const prisma = new PrismaClient();

const moderationService = {
    validation: async (contentType, contentId) => {
        const user = await getUserByContentId(contentType, contentId);

        const to = user.author.email;
        const subject = `Validation de votre ${contentType}`;
        const text = `Votre ${contentType} a été validé par un modérateur. Son contenu est désormais visible par la communauté. Merci de votre participation !`;

        try {
            await prisma[contentType].update({
                where: {
                    id: Number(contentId),
                },
                data: {
                    is_moderate: true,
                },
            });
        } catch (error) {
            createError("Error");
        }

        // envoi du mail de notification à l'utilisateur
        sendMail(to, subject, text);
    },
    rejection: async (contentType, contentId, message) => {
        const user = await getUserByContentId(contentType, contentId);

        const to = user.author.email;
        const subject = `Validation de votre ${contentType}`;
        const text = `Votre ${contentType} a été refusé par un modérateur. !\n\n ${message} \n\n Veuillez vous rendre sur votre Dashboard et apporter les modifications nécessaires avant de renouveler votre envoi`;

        // envoi du mail de notification à l'utilisateur
        sendMail(to, subject, text);
    },
};

module.exports = moderationService;
