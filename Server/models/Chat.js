

const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    sender:Number,
    receiver:Number,
    message:String,
    receivedDate:Date,
    new:Boolean,
});

module.exports = mongoose.model("Chat", ChatSchema);
