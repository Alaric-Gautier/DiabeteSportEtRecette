const jwt = require("jsonwebtoken");
const { createAccessToken, createCookie, isTokenBlacklisted } = require("../utils/token");

// Verify the access token
const verifyAccessToken = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    console.log("accessToken === ", accessToken);
    const isBlacklisted = await isTokenBlacklisted(accessToken);

    if (!accessToken || isBlacklisted) return res.sendStatus(401);

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return verifyRefreshToken(req, res, next);
        }
        req.user = user;
        next();
    });
};

// Verify the refresh Token
const verifyRefreshToken = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    console.log("refreshToken === ", refreshToken);

    const isBlacklisted = await isTokenBlacklisted(refreshToken);

    if (!refreshToken || isBlacklisted) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.redirect(301, "/login"); // TODO Je ne suis pas sûr du fonctionnement de la redirection... A vérifier...
        const newAccessToken = createAccessToken(user);
        req.user = user;
        createCookie("accessToken", newAccessToken, res);
        next();
    });
};

module.exports = {
    verifyAccessToken,
    verifyRefreshToken,
};
