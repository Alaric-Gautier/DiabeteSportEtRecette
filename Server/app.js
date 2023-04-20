const express = require("express");
const app = express();
require("dotenv").config();

// Import Middlewares
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const errorHandler = require("./middlewares/errorHandler");

// Connection to MongoDB
require("./.config/mongoConnect");

// import the routes
const home = require("./routes/homeRoute");
const user = require("./routes/userRoute");
const connect = require("./routes/connectRoute");
const recipe = require("./routes/recipeRoute");
const sport = require("./routes/sportRoute");
const forgotPassword = require("./routes/passwordRoute");

// Configure the app
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());

// Configure the route

app.use("/", connect);
app.use("/", forgotPassword)
app.use(home);
app.use("/sport-exercise", sport);
app.use(connect);
app.use("/user", user);
app.use("/recipe", recipe);

// Middleware which receive and handle all errors in app
app.use(errorHandler);

module.exports = app;
