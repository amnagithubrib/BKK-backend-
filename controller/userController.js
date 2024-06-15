const User = require("../db/models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userController = {
    async signup(req, res) {
        try {
            const { number, pin } = req.body;
            if (!number || !pin) {
                return res.status(400).json({ success: false, message: "All fields are required." });
            }
            const existingUser = await User.query().findOne({ number });
            if (existingUser) {
                return res.status(409).json({ success: false, message: " already in use" });
            }
            const newUser = await User.query().insert({
                number,
                pin

            });
            if (!newUser) {
                return res.status(200).json({ success: true, message: "Signup successful" });
            }
            res.status(201).json({ success: true, data: newUser });
        } catch (error) {
            console.error("Error during signup:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    },
    async login(req, res) {
        try {
            const { number, pin } = req.body;
            if (!number || !pin) {
                return res.status(400).json({ success: false, message: "number and pin are required." });
            }
            const user = await User.query().findOne({ number });
            if (!user) {
                return res.status(401).json({ success: false, message: "No user found " });
            }
            const token = jwt.sign({ id: user.id }, "amna", { expiresIn: "1h" });
            res.status(200).json({ success: true, message: "Login successful", token });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
};

module.exports = userController;
