const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    header: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    published: {
        type: String,
        required: true,
        unique: true
    },
    isSaved: {
        type: Boolean,
        default: false
    }
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;