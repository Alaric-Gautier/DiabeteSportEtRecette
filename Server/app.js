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

// Configure the app
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());

// Configure the route

app.use(home);
app.use(user);
app.use(recipe);
app.use(connect);

// Middleware which receive and handle all errors in app
app.use(errorHandler);

module.exports = app;
