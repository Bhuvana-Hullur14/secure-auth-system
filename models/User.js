const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    failedAttempts: { type: Number, default: 0 },
    lockUntil: Date
});

module.exports = mongoose.model("User", userSchema);
