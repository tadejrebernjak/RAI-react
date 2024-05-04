const { PostModel } = require("../models/postModel");
const CommentModel = require("../models/commentModel");

module.exports = {
    create: async (req, res, next) => {
        try {
            const post = await PostModel.findOne({ _id: req.body.postId });

            if (!post) {
                const error = new Error("Post not found");
                error.status = 400;
                return next(error);
            }

            const comment = new CommentModel({
                content: req.body.content,
                postedBy: req.user._id,
            });

            await comment.save();

            console.log(post);
            post.comments.push(comment._id);

            await post.save();

            return res.status(200).json(post);
        } catch (err) {
            console.log(err);
            const error = new Error("Failed to create new comment");
            error.status = 500;
            return next(error);
        }
    },
};
