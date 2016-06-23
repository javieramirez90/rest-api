/**
 * Modules required
 */
var mongoose = require("mongoose"),
    Schema   = mongoose.Schema
;


/**
 * New Schema
 */
var newSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true // It sets automatically the fields: createdAt and updatedAt in the news collection.
});


/**
 * The schema is useless so far, then I create a model to use it.
 * Mongoose will create a collection named News (plural) for the first specified parameter.
 */
var news = mongoose.model("New", newSchema);


/**
 * Making this module available for the Node App.
 */
module.exports = news;
