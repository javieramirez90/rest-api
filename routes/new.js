/**
 * News
 */
var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    News       = require("../models/new"),
    router     = express.Router()
;


// If data coming through the http request is in json format, it is parsed and converted to a javascript object
router.use(bodyParser.json());


/**
 * Working with several news (items).
 */
router.route("/")
    .get(function(req, res, next) {
        News.find({}, function(err, items) {
            if (err) {
                throw err;
            }
            res.format({
                html: function() {
                    res.render("news", {
                        title: "News Feed",
                        items: items
                    });
                },
                json: function() {
                    res.json(items);
                }
            });
        });
    })

    .post(function(req, res, next) {
        News.create(req.body, function(err, items) {
            if (err) {
                throw err;
            }
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            // printing log in the console.
            console.log("News successfully created!");
            res.end("News successfully created!");
        });
    })

    .delete(function(req, res, next) {
        News.remove({}, function(err, items) {
            if (err) {
                throw err;
            }
            res.json(items);
        });
    })
;


/**
 * Working with single new (item).
 */
router.route("/:newId")
    .get(function(req, res, next) {
        News.findById(req.params.newId, function(err, item) {
            if (err) {
                throw err;
            }
            res.json(item);
        });
    })

    .put(function(req, res, next) {
        News.findByIdAndUpdate(req.params.newId, {
            $set: req.body
        },
        {
            new: true
        },
        function(err, item) {
            if (err) {
                throw err;
            }
            res.json(item);
        });
    })

    .delete(function(req, res, next) {
        News.findByIdAndRemove(req.params.newId, function(err, item) {
            if (err) {
                throw err;
            }
            res.json(item);
        });
    })
;


module.exports = router;
