const mongoose = require("mongoose");

const BlacklistTokenSchema = new mongoose.Schema({
    token: {
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

module.exports = mongoose.model("BlacklistToken", BlacklistTokenSchema);
