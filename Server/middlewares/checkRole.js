const { createError } = require("../utils/tools");

const checkRole = rolesAllowed => {
    return (req, res, next) => {
        const { roles } = req.user;
        console.log(roles);
        try {
            roles.forEach(role => {
                console.log("role dans foreach === ", role.name);
                if (!role || !rolesAllowed.includes(role.name)) {
                    createError("Forbidden");
                }
                console.log("je passe ?");
                next();
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    };
};

module.exports = { checkRole };
