const { PrismaClient } = require("@prisma/client");
const { createError, sendMail } = require("../utils/tools");
const prisma = new PrismaClient();

const moderationService = {
    validation: async (contentType, contentId) => {
        const user = await prisma[contentType].findFirst({
            where:{
                id:contentId
            },
            select:{
                author:true
            }
        })
        if(!user){
            createError("NotFound")
        }

        const to = user.author.email;
        const subject = `Validation de votre ${contentType}`;
        const text = `Votre ${contentType} a été validé par un modérateur. Son contenu est désormais visible par la communauté. Merci de votre participation !`;

        const isConfirmed = await prisma[contentType].update({
            where: {
                id: contentId,
            },
            data: {
                isConfirmed: true,
            },
        });
        
        if (!isConfirmed) {
            createError("Error")
        }

        // envoi du mail de notification à l'utilisateur
        sendMail(to, subject, text); // Il faut trouver un moyen de récupérer le mail de l'utilisateur
    },
    rejection: (contentType, contentId) => {
        // envoi un mail à l'utilisateur afin de faire l'update du contenu rejeté
        //! penser à mettre sur le dashboard de l'utilisateur un onglet pour afficher tous les contenus non validé
        //! éventuellement triés par type de contenu (commentaire, recette, exercice de sport)
    },
};

module.exports = moderationService;
