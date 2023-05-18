const { createError } = require("../utils/tools");

const checkRole = rolesAllowed => {
    return (req, res, next) => {
        const { roles } = req.user;
        try {
            roles.forEach(role => {
                if (!role || !rolesAllowed.includes(role.name)) {
                    createError("Forbidden");
                }
                next();
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    };
};

module.exports = { checkRole };
