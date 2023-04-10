const jwt = require("jsonwebtoken");
const { createAccessToken, createCookie } = require("../utils/token");
const BlacklistToken = require("../models/BlacklistToken");

const isTokenBlacklisted = async token => {
    const blacklistedToken = await BlacklistToken.findOne({ token });
    return blacklistedToken !== null;
};

// Verify the access token
const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    let token = authHeader && authHeader.split(" ")[1];
    const newToken = req.cookies.accessToken;

    if (newToken) {
        token = newToken;
    }

    if (!token) return res.sendStatus(401);
    console.log(token);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return verifyRefreshToken(req, res, next);
        }
        req.user = user;
        next();
    });
};

// Verify the refresh Token
const verifyRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.redirect(301, "/login"); // TODO Je ne suis pas sûr du fonctionnement de la redirection... A vérifier...
        const newAccessToken = createAccessToken(user);
        req.user = user;
        createCookie("accessToken", newAccessToken, 600, res);
        next();
    });
};

module.exports = {
    verifyAccessToken,
    verifyRefreshToken,
};
