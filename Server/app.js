const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const logger = require("morgan");
require("dotenv").config();

// import the routes
const home = require("./routes/homeRoute");
const user = require("./routes/userRoute");
const connect = require("./routes/connectRoute");

// Configure the app
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());

// Configure the route

app.use(home);
app.use(user);
app.use(connect);

module.exports = app;
