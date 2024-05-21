const User = require('../db/models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userService = {
    async createUser({ name, email, password }) {
        try {
            const existingUser = await User.query().findOne({ email });
            if (existingUser) {
                throw new Error('Email already in use');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.query().insert({
                name,
                email,
                password: hashedPassword
            });
            return { id: newUser.id, name: newUser.name, email: newUser.email };
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    },

    async loginUser({ email, password }) {
        try {
            const user = await User.query().findOne({ email });
            if (!user) {
                throw new Error('No user found with this email');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token };
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }
};

module.exports = userService;
