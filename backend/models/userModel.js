require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
});

userSchema.pre("save", function (next) {
    const user = this;

    bcrypt.hash(user.password, process.env.PASSWORD_SALT, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
    });
});

userSchema.statics.authenticate = async (username, password, callback) => {
    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            const err = new Error("User not found");
            err.status = 401;
            return callback(err, null);
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (result === true) {
                return callback(null, user);
            } else {
                const err = new Error("Wrong username or password");
                err.status = 401;
                return callback(err, null);
            }
        });
    } catch (err) {
        return callback(err);
    }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
