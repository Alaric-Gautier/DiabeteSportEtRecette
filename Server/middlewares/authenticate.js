const jwt = require("jsonwebtoken");
const { createAccessToken, createCookie, isTokenBlacklisted } = require("../utils/token");
const { createError } = require("../utils/tools");

// Verify the access token
const verifyAccessToken = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    try {
        const isBlacklisted = await isTokenBlacklisted(accessToken);

        if (!accessToken || isBlacklisted) createError("Unauthorized", "", {isAuth:false});

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return verifyRefreshToken(req, res, next);
            }
            req.user = user;
            next();
        });
    } catch (err) {
        next(err);
    }
};

// Verify the refresh Token
const verifyRefreshToken = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    try {
        const isBlacklisted = await isTokenBlacklisted(refreshToken);

        if (!refreshToken || isBlacklisted) createError("Unauthorized", "", {isAuth:false});

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.redirect(301, "/login"); // TODO Je ne suis pas sûr du fonctionnement de la redirection... A vérifier...
            const newAccessToken = createAccessToken(user);
            req.user = user;
            createCookie("accessToken", newAccessToken, res);
            next();
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    verifyAccessToken,
    verifyRefreshToken,
};
