const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/BlacklistToken");
const ConfirmationPair = require("../models/ConfirmationPair");

const createConfirmationCode = email => {
    return jwt.sign({ email }, process.env.CONFIRMATION_CODE_SECRET, {
        expiresIn: "10m",
    });
};
const createConfirmationKey = () => {
    return Math.random().toString(36).slice(-8);
};

// Create an access token
const createAccessToken = user => {
    return jwt.sign({ id: user.id, roles: user.roles }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m",
    });
};

// Create a refresh token
const createRefreshToken = user => {
    return jwt.sign({ id: user.id, roles: user.roles }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1h",
    });
};

const createCookie = (name, token, res) => {
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 3600 * 1000), // Expires in 1h
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

const addConfirmationPairToDb = async (confirmationCode, confirmationKey, email, expirationDate) => {
    const confirmationPair = new ConfirmationPair({
        confirmationCode,
        confirmationKey,
        email,
        expirationDate,
    });
    await confirmationPair.save();
};

const isTokenBlacklisted = async token => {
    const blacklistedToken = await BlacklistToken.findOne({ token });
    return blacklistedToken !== null;
};

module.exports = {
    createConfirmationCode,
    createConfirmationKey,
    createAccessToken,
    createRefreshToken,
    createCookie,
    addToBlacklist,
    addConfirmationPairToDb,
    isTokenBlacklisted,
};
