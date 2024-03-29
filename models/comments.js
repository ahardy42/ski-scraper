const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: "Saved"
    }
});

Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;