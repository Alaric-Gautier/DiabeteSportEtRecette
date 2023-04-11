const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const logger = require("morgan");
require("dotenv").config();

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

app.use(connect);
app.use(home);
app.use(user);
app.use(recipe);

module.exports = app;
