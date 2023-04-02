const express = require("express");
const home = require("./routes/homeRoute");
const user = require("./routes/userRoute");
const app = express();
const logger = require("morgan");
require("dotenv").config();


// Configure the app
app.use(logger("dev"));
app.use(express.json());

// Configure the route

// Public routes
app.use(home);
app.use(user);

// Protected routes

module.exports = app;