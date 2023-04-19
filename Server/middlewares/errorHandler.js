const errorHandler = (err, req, res, next) => {
    const data = err.data;
    console.error(err.stack);
    switch (err.name) {
        case "AccountError":
            res.status(401).json({ message: err.message || "Le mot de passe ou l'email est incorrect. Veuillez réessayer" });
            break;

            case "forbidden":
            res.status(403).json({ message: err.message || "Vous n'avez pas accès à cette ressource" });
            break;
        case "notFound":
            res.status(404).json({ message: err.message || "Désolé, la page que vous cherchez est introuvable." });
            break;
        case "ResourceConflictError":
            res.status(409).json({ message: err.message || "La requête ne peut pas être traitée car la ressource existe déjà." });
            break;
        case "Unauthorized":
            res.status(401).json({ message: err.message || "Vous n'avez pas l'autorisation d'accéder à cette ressource" });
            break;
        case "ValidationError":
            res.status(422).json({ message: err.message || "La saisie n'est pas valide.", data });
            break;
        case "ReferenceError":
            res.status(500).json({ message: "Erreur serveur" });
            break;
        default:
            res.status(500).json({ message: err.message || "Erreur serveur" });
            break;
    }
};

module.exports = errorHandler;
