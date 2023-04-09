const jwt = require("jsonwebtoken");

// Create an access token
createAccessToken = user => {
    return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m",
    });
};

// Create a refresh token
createRefreshToken = user => {
    return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1h",
    });
};

createCookie = (name, token, duration, res) => {
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + duration * 1000), // Expires in 1h
        sameSite: "strict",
    };
    res.cookie(`${name}`, token, cookieOptions);
};

module.exports = {
    createAccessToken,
    createRefreshToken,
    createCookie,
};
