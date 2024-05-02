const UserModel = require("../models/userModel");

module.exports = {
    register: async (req, res, next) => {
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
                    error.status = 401;
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
                    console.log(err);
                    const error = new Error("Failed to destroy session");
                    error.status = 500;
                    return next(error);
                } else {
                    return res.status(200);
                }
            });
        }
    },
};
