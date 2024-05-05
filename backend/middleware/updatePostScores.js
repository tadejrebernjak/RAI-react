const decay = require("decay");
const { PostModel } = require("../models/postModel");

const hotScore = decay.redditHot();

const updatePostScores = async () => {
    try {
        const posts = await PostModel.find();

        posts.forEach(async (post) => {
            post.score = hotScore(
                post.likes.length,
                post.dislikes.length,
                post.postedAt
            );
            await post.save();
        });

        console.log("Updated post scores");
    } catch (err) {
        console.log("Failed to update post scores:", err);
    }
};

module.exports = updatePostScores;
