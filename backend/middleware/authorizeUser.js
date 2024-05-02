const UserModel = require("../models/userModel");

const authorizeUser = async (req, res, next) => {
    try {
        if (req.session && req.session.userId) {
            req.user = await UserModel.findOne({ _id: req.session.userId });

            return next();
        } else {
            const error = new Error("You must be logged in for this action");
            error.status = 401;
            return next(error);
        }
    } catch (err) {
        const error = new Error("Failed to fetch user");
        error.status = 500;
        return next(error);
    }
};

module.exports = authorizeUser;
