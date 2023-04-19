const { createError } = require("../utils/tools");

const checkRole = (req, res, next, rolesAllowed) => {
    console.log("req ===", req);
    // const { roles } = req.user;
    try {
        test = ["admin"]
        if (!test) {
            createError("Forbidden");
        }
        if (rolesAllowed.includes(test)) {
            next();
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = {checkRole};
