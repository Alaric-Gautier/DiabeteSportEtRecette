const mongoose = require("mongoose");

const confirmationPairSchema = new mongoose.Schema({
    confirmationKey: {
        type: String,
        required: true,
        unique: true,
    },
    confirmationCode: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    expirationDate: {
        type: Date,
        required: true,
        expires: 0,
    },
});

module.exports = mongoose.model("confirmationPair", confirmationPairSchema);
