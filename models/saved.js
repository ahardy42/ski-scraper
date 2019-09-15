const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SavedSchema = new Schema({
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
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    article: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    }
});

// This creates our model from the above schema, using mongoose's model method
var Saved = mongoose.model("Saved", SavedSchema);

// Export the Article model
module.exports = Saved;