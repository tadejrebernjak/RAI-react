require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const cron = require("node-cron");

// Ustvari server
const app = express();

app.use(cors());

// Povezava z bazo
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URI);

const db = mongoose.connection;
db.on("error", () => {
    console.error.bind(console, "Failed to connect to DB");
});
db.on("open", () => {
    console.log("Connected to DB");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const updatePostScores = require("./middleware/updatePostScores");

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/public/images", express.static("public/images"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    if (err.status === 500) console.log(err);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    return res.status(err.status || 500).send(err.message);
});

cron.schedule("*/5 * * * *", updatePostScores);

module.exports = app;
