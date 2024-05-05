const { PostModel, RatingModel } = require("../models/postModel");

const decay = require("decay");
const hotScore = decay.redditHot();

module.exports = {
    list: async (req, res, next) => {
        try {
            const posts = await PostModel.find().sort({ postedAt: -1 });

            const responsePosts = posts.map((post) => {
                return {
                    id: post._id,
                    title: post.title,
                    content: post.content,
                    image: post.image,
                    likes: post.likes.length,
                    dislikes: post.dislikes.length,
                    reports: post.reports.length,
                    postedAt: post.postedAt,
                };
            });

            const filteredPosts = responsePosts.filter(
                (post) => post.reports < 3
            );

            return res.status(200).json(filteredPosts);
        } catch (err) {
            const error = new Error("Failed to fetch posts");
            error.status = 500;
            return next(error);
        }
    },
    hot: async (req, res, next) => {
        try {
            const posts = await PostModel.find().sort({ score: -1 });

            const responsePosts = posts.map((post) => {
                return {
                    id: post._id,
                    title: post.title,
                    content: post.content,
                    image: post.image,
                    likes: post.likes.length,
                    dislikes: post.dislikes.length,
                    reports: post.reports.length,
                    postedAt: post.postedAt,
                };
            });

            const filteredPosts = responsePosts.filter(
                (post) => post.reports < 3
            );

            return res.status(200).json(filteredPosts);
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
                        model: "user",
                    },
                    options: { sort: { postedAt: -1 } },
                });

            if (!post) {
                const error = new Error("Post not found");
                error.status = 404;
                return next(error);
            }

            const responsePost = {
                id: post._id,
                title: post.title,
                content: post.content,
                image: post.image,
                likes: post.likes.length,
                dislikes: post.dislikes.length,
                reports: post.reports.length,
                liked: null,
                disliked: null,
                reported: null,
                comments: post.comments,
                postedBy: post.postedBy.username,
                postedAt: post.postedAt,
            };

            if (req.user) {
                responsePost.liked = post.likes.some((like) =>
                    like.ratedBy.equals(req.user._id)
                );
                responsePost.disliked = post.dislikes.some((dislike) =>
                    dislike.ratedBy.equals(req.user._id)
                );
                responsePost.reported = post.reports.some((report) =>
                    report.ratedBy.equals(req.user._id)
                );
            }

            return res.status(200).json(responsePost);
        } catch (err) {
            console.log(err);
            const error = new Error(
                `Error when fetching post with ID: ${postId}`
            );
            error.status = 500;
            return next(error);
        }
    },
    create: async (req, res, next) => {
        const filePath = req.file.path.replace(/\\/g, "/");

        const post = new PostModel({
            title: req.body.title,
            content: req.body.content,
            image: "http://localhost:5000/" + filePath,
            likes: [],
            dislikes: [],
            reports: [],
            postedBy: req.user._id,
        });

        try {
            await post.save();

            return res.status(200).json(post);
        } catch (err) {
            console.log(err);
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
            return;
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

                post.score = hotScore(
                    post.likes.length,
                    post.dislikes.length,
                    post.postedAt
                );

                await post.save();
            }
            return res.status(200).send("ok");
        } catch (err) {
            const error = new Error("Failed to change post rating");
            error.status = 500;
            return next(error);
        }
    },
    report: async (req, res, next) => {
        const userId = req.user._id;
        const postId = req.params.id;

        try {
            const post = await PostModel.findOne({ _id: postId });
            if (!post) {
                const error = new Error("Post not found");
                error.status = 404;
                return next(error);
            }

            const reportIndex = post.reports.findIndex((report) =>
                report.ratedBy.equals(userId)
            );

            if (reportIndex !== -1) {
                post.reports.splice(reportIndex, 1);
            } else {
                post.reports.push(new RatingModel({ ratedBy: userId }));
            }

            await post.save();

            return res.status(200).send("ok");
        } catch (err) {
            const error = new Error("Failed to change post rating");
            error.status = 500;
            return next(error);
        }
    },
};
