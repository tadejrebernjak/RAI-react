const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    ratedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    ratedAt: {
        type: Date,
        default: () => Date.now(),
    },
});

const postSchema = new Schema({
    title: String,
    content: String,
    image: String,
    likes: [ratingSchema],
    dislikes: [ratingSchema],
    reports: [ratingSchema],
    comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
    postedAt: {
        type: Date,
        default: () => Date.now(),
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
});

const PostModel = mongoose.model("post", postSchema);
const RatingModel = mongoose.model("rating", ratingSchema);
module.exports = { PostModel, RatingModel };
