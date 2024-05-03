const { UserModel } = require("../models/userModel");

module.exports = {
    register: async (req, res, next) => {
        if (req.body.password != req.body.passwordRepeat) {
            const error = new Error("Passwords don't match");
            error.status = 400;
            return next(error);
        }

        if (await UserModel.exists({ email: req.body.email })) {
            const error = new Error("Email is already taken");
            error.status = 400;
            return next(error);
        }

        if (await UserModel.exists({ email: req.body.username })) {
            const error = new Error("Username is already taken");
            error.status = 400;
            return next(error);
        }

        const user = new UserModel({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });

        try {
            await user.save();
            return res.status(200).json(user);
        } catch (err) {
            const error = new Error("Failed to create user");
            error.status = 500;
            return next(error);
        }
    },
    login: async (req, res, next) => {
        UserModel.authenticate(
            req.body.username,
            req.body.password,
            (err, user) => {
                if (err || !user) {
                    const error = new Error("Wrong username or password");
                    error.status = 400;
                    return next(error);
                }

                req.session.userId = user._id;
                return res.status(200).json({
                    userId: user._id,
                    username: user.username,
                });
            }
        );
    },
    logout: async (req, res, next) => {
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    const error = new Error("Failed to destroy session");
                    error.status = 500;
                    return next(error);
                } else {
                    return res.status(200);
                }
            });
        }
    },
    session: async (req, res, next) => {
        if (!req.session || !req.session.userId) {
            const error = new Error("Session expired");
            error.status = 401;
            return next(error);
        }

        try {
            const user = await UserModel.findOne({ _id: req.session.userId });
            res.status(200).json({
                userId: user._id,
                username: user.username,
            });
        } catch (err) {
            const error = new Error("Failed to find user");
            error.status = 500;
            return next(error);
        }
    },
};
