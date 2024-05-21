const User = require('../db/models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = {
    // Signup function
    async signup(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ success: false, message: "All fields are required." });
            }
            const existingUser = await User.query().findOne({ email });
            if (existingUser) {
                return res.status(409).json({ success: false, message: 'Email already in use' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.query().insert({
                name,
                email,
                password: hashedPassword
            });
            if (!newUser) {
                return res.status(200).json({ success: true, message: "Signup successful" });
            }
            res.status(201).json({ success: true, data: { id: newUser.id, name: newUser.name, email: newUser.email } });
        } catch (error) {
            console.error("Error during signup:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    },

    // Login function
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ success: false, message: "Email and password are required." });
            }
            const user = await User.query().findOne({ email });
            if (!user) {
                return res.status(401).json({ success: false, message: 'No user found with this email' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
            const token = jwt.sign({ id: user.id }, 'amna', { expiresIn: '1h' });
            res.status(200).json({ success: true, message: "Login successful", token });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    },

    // Test Route (possibly for checking authentication middleware)
    async testRoute(req, res) {
        try {
            console.log("Secret route accessed");
            console.log(req.user);
            res.status(200).json({ success: true, message: "Access granted to secret route", user: req.user });
        } catch (error) {
            console.error("Error in test route:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
};

module.exports = userController;

