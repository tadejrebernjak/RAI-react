const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const decay = require("decay");
const hotScore = decay.redditHot();

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
    score: { type: Number, default: () => hotScore(0, 0, new Date()) },
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
