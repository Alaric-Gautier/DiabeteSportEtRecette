const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/BlacklistToken");

const createConfirmationCode = email => {
    return jwt.sign({ email }, process.env.CONFIRMATION_CODE_SECRET, {
        expiresIn: "10m",
    });
};

// Create an access token
const createAccessToken = user => {
    return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m",
    });
};

// Create a refresh token
const createRefreshToken = user => {
    return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1h",
    });
};

const createCookie = (name, token, res) => {
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 3600 * 1000), // Expires in 1h
        sameSite: "strict",
    };
    res.cookie(name, token, cookieOptions);
};

const addToBlacklist = async (token, expirationDate) => {
    const blacklistedToken = new BlacklistToken({
        token,
        expirationDate,
    });
    await blacklistedToken.save();
};

const isTokenBlacklisted = async token => {
    const blacklistedToken = await BlacklistToken.findOne({ token });
    return blacklistedToken !== null;
};

module.exports = {
    createConfirmationCode,
    createAccessToken,
    createRefreshToken,
    createCookie,
    addToBlacklist,
    isTokenBlacklisted,
};
