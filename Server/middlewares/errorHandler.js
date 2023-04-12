const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    console.log("message ==", err.message, "name===", err.name);
    switch (err.name) {
        case "ValidationError":
            res.status(422).json({ message: err.message || "La saisie n'est pas valide." });
            break;
        case "AccountError":
            console.log("ici ?");
            res.status(401).json({ message: err.message || "Le mot de passe ou l'email est incorrect. Veuillez réessayer" });
            break;
        case "UnauthirizedError":
            res.status(401).json({ message: err.message || "Vous n'avez pas l'autorisation d'accéder à cette ressource" });
            break;
        case "ResourceConflictError":
            res.status(409).json({ message: err.message || "La requête ne peut pas être traitée car la ressource existe déjà." });
            break;
        default:
            res.status(500).json({ message: err.message || "Erreur serveur" });
            break;
    }
};

module.exports = errorHandler;
