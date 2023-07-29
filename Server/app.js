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
// require("./.config/importDatasToDb");

// import the routes
const user = require("./routes/userRoute");
const recipe = require("./routes/recipeRoute");
const sport = require("./routes/sportRoute");
const review = require("./routes/reviewRoute");
const moderation = require("./routes/moderationRoute");
const public = require("./routes/publicRoute")

// Configure the app
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: "GET, POST, PUT, DELETE", // Méthodes HTTP autorisées
        allowedHeaders: "Content-Type, Authorization", // En-têtes autorisés
    })
);

// Configure the route

app.use("/", public);
app.use("/moderation", moderation);
app.use("/sport-exercise", sport);
app.use("/review", review);
app.use("/user", user);
app.use("/recipe", recipe);

// Middleware which receive and handle all errors in app
app.use(errorHandler);

module.exports = app;
