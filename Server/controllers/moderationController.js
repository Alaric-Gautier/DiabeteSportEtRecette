const moderationService = require("../services/moderationService")

const moderationController = {
    validation: async (req, res, next) => { 
        const {contentType, contentId} = req.params;

        try {
            await moderationService.validation(contentType,contentId)
            res.status(200).json({message:"Contenu validé"})
        } catch (err) {
           next(err) 
        }
    },
    rejection: async (req, res, next) => {
        const {contentType, contentId} = req.params;

        try {
            await moderationService.rejection(contentType,contentId)
            res.status(200).json({message:"Contenu rejeté"})
        } catch (err) {
           next(err) 
        }
    },
};

module.exports = moderationController;
