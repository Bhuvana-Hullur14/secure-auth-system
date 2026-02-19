const bcrypt = require("bcrypt");
const User = require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/secureAuthDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Basic route
app.get("/", (req, res) => {
    res.send("Secure Auth System Running 🔐");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.send("User Registered Successfully 🔐");

    } catch (error) {
        console.log(error);
        res.send("Error registering user");
    }
});
