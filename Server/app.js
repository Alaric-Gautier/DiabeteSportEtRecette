const express = require("express");
const home = require("./routes/homeRoute");
const app = express();
const logger = require("morgan");
require("dotenv").config();


// Configure the app
app.use(logger("dev"));
app.use(express.json());

// Configure the route
app.use(home);

module.exports = app;