require("dotenv").config();
const { UserModel } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authorizeUser = async (req, res, next) => {
    const token = req.headers.authorization;
    const trimmed = token.replace("Bearer ", "");

    if (!token) {
        req.user = null;
        return next();
    }

    jwt.verify(trimmed, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            req.user = null;
            return next();
        }

        try {
            req.user = await UserModel.findOne({ email: decoded.email });
            return next();
        } catch (err) {
            req.user = null;
            return next();
        }
    });
};

module.exports = authorizeUser;
