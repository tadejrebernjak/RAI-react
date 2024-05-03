const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    ratedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
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
    postedAt: {
        type: Date,
        default: () => Date.now(),
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const Rating = mongoose.model("Rating", ratingSchema);
const Post = mongoose.model("Post", postSchema);
module.exports = { Post, Rating };
