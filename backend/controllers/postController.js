const { populate } = require("../models/commentModel");
const { PostModel, RatingModel } = require("../models/postModel");

module.exports = {
    list: async (req, res, next) => {
        try {
            const posts = await PostModel.find()
                .sort({ postedAt: -1 })
                .populate("postedBy");

            const postsFiltered = posts.map((post) => {
                return {
                    ...post,
                    postedBy: post.postedBy.username,
                };
            });

            return res.status(200).json(postsFiltered);
        } catch (err) {
            const error = new Error("Failed to fetch posts");
            error.status = 500;
            return next(error);
        }
    },
    find: async (req, res, next) => {
        const postId = req.params.id;

        try {
            const post = await PostModel.findOne({ _id: postId })
                .populate("postedBy")
                .populate({
                    path: "comments",
                    populate: {
                        path: "postedBy",
                        model: "User",
                    },
                    options: { sort: { postedAt: -1 } },
                });

            if (!post) {
                const error = new Error("Post not found");
                error.status = 404;
                return next(error);
            }

            return res.status(200).json(post);
        } catch (err) {
            const error = new Error(
                `Error when fetching post with ID: ${postId}`
            );
            error.status = 500;
            return next(error);
        }
    },
    create: async (req, res, next) => {
        const post = new PostModel({
            title: req.body.title,
            content: req.body.content,
            image: "",
            likes: [],
            dislikes: [],
            postedBy: req.user._id,
        });

        try {
            await post.save();

            return res.status(200).json(post);
        } catch (err) {
            const error = new Error("Failed to save new post");
            error.status = 500;
            return next(error);
        }
    },
    rate: async (req, res, next) => {
        const userId = req.user._id;
        const postId = req.params.id;
        const action = req.params.action;

        if (action != "like" && action != "dislike") {
        }

        try {
            const post = await PostModel.findOne({ _id: postId });
            if (!post) {
                const error = new Error("Post not found");
                error.status = 404;
                return next(error);
            }

            const likeIndex = post.likes.findIndex((like) =>
                like.ratedBy.equals(userId)
            );
            const dislikeIndex = post.dislikes.findIndex((dislike) =>
                dislike.ratedBy.equals(userId)
            );

            if (action == "like") {
                let addRating = true;

                if (dislikeIndex !== -1) {
                    post.dislikes.splice(dislikeIndex, 1);
                } else if (likeIndex !== -1) {
                    post.likes.splice(likeIndex, 1);
                    addRating = false;
                }

                if (addRating) {
                    post.likes.push(
                        new RatingModel({
                            ratedBy: userId,
                        })
                    );
                }

                await post.save();
            } else {
                let addRating = true;

                if (likeIndex !== -1) {
                    post.likes.splice(likeIndex, 1);
                } else if (dislikeIndex !== -1) {
                    post.dislikes.splice(dislikeIndex, 1);
                    addRating = false;
                }

                if (addRating) {
                    post.dislikes.push(
                        new RatingModel({
                            ratedBy: userId,
                        })
                    );
                }

                await post.save();
                return res.status(200);
            }
        } catch (err) {
            const error = new Error("Failed to change post rating");
            error.status = 500;
            return next(error);
        }
    },
};
