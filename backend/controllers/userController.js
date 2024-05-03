require("dotenv").config();
const { UserModel } = require("../models/userModel");
const jwt = require("jsonwebtoken");

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

                const token = jwt.sign(
                    {
                        userId: user._id,
                        email: user.email,
                        username: user.username,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "30d" }
                );

                return res.status(200).json({
                    token,
                    username: user.username,
                });
            }
        );
    },
    token: async (req, res) => {
        return res.status(200).json({
            userId: req.user._id,
            username: req.user.username,
        });
    },
};
