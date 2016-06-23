var express      = require("express"),
    path         = require("path"),
    favicon      = require("serve-favicon"),
    logger       = require("morgan"),
    cookieParser = require("cookie-parser"),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    routes       = require("./routes/index"),
    newRouter   = require("./routes/new"),
    app          = express(),
    http         = require("http"),
    hostname     = "localhost",
    port         = 3000
;


/**
 * Connection URL
 */
var url = "mongodb://localhost:27017/restapi";

/**
 * Mongoose Connection
 */
mongoose.connect(url);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error: "));

db.once("open", function() {
    console.log("Server connection was successfully established!");
});


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);
app.use("/news", newRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});


/**
 * Error Handlers
 *
 * Development Error Handler
 *
 * It will print the stacktrace.
 */
if (app.get("env") === "development") {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}


/**
 * Production Error Handler
 *
 * No stacktraces leaked to the user.
 */
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});


app.listen(port, hostname, function() {
    console.log("Server running at http://" + hostname + ":" + port + "/");
});


module.exports = app;
