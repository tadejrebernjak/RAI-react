const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: String,
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    postedAt: {
        type: Date,
        default: () => Date.now(),
    },
});

const CommentModel = mongoose.model("comment", commentSchema);
module.exports = CommentModel;
