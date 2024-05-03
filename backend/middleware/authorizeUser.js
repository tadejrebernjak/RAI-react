require("dotenv").config();
const { UserModel } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authorizeUser = async (req, res, next) => {
    const token = req.headers.authorization;
    const trimmed = token.replace("Bearer ", "");

    if (!token) {
        const error = new Error("Unauthorized");
        error.status = 401;
        return next(error);
    }

    jwt.verify(trimmed, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            const error = new Error("Invalid token");
            error.status = 401;
            return next(error);
        }

        try {
            req.user = await UserModel.findOne({ email: decoded.email });
            return next();
        } catch (err) {
            const error = new Error("Failed to fetch user");
            error.status = 500;
            return next(error);
        }
    });
};

module.exports = authorizeUser;
