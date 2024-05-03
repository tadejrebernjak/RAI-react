const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: String,
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    postedAt: {
        type: Date,
        default: () => Date.now(),
    },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
