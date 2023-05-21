const express = require("express");
const app = express();
require("dotenv").config();

// Import Middlewares
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

// Connection to MongoDB
require("./.config/mongoConnect");

// Import ingredients and roles to MySQL database
require("./.config/importDatasToDb");

// import the routes
const user = require("./routes/userRoute");
const connect = require("./routes/connectRoute");
const recipe = require("./routes/recipeRoute");
const sport = require("./routes/sportRoute");
const review = require("./routes/reviewRoute");
const forgotPassword = require("./routes/passwordRoute");
const moderation = require("./routes/moderationRoute");

// Configure the app
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// Configure the route

app.use("/", connect);
app.use("/", forgotPassword);
app.use("/moderation", moderation);
app.use("/sport-exercise", sport);
app.use("/review", review);
app.use("/user", user);
app.use("/recipe", recipe);

// Middleware which receive and handle all errors in app
app.use(errorHandler);

module.exports = app;
