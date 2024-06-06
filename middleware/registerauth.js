// require('dotenv').config();
// const jwt = require('jsonwebtoken');
// const Registrations = require('../db/models/registrations');

// exports.Authenticated = async (req, res, next) => {
//     try {
//         const authHeader = req.header('Authorization');

//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.status(401).json({ error: 'Please provide a valid token' });
//         }

//         const token = authHeader.split(' ')[1];

//         const decodedData = jwt.verify(token, process.env.JWT_SECRET || 'amna');

//         const user = await Registrations.query().findById(decodedData.id);

//         if (!user) {
//             return res.status(401).json({ error: 'Unauthorized' });
//         }
//         req.user = user;

//         next();
//     } catch (error) {
//         console.error('Error authenticating user:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

require("dotenv").config();
const jwt = require("jsonwebtoken");
const Registrations = require("../db/models/registrations"); // Adjust the path as necessary

exports.Authenticated = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Please provide a valid token" });
        }

        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET || "amna";

        // Verify the token using the environment variable JWT_SECRET
        const decodedData = jwt.verify(token, secret);

        // Find the user based on the decoded user ID
        const user = await Registrations.query().findById(decodedData.id);

        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Attach the user object to the request
        req.user = user;

        next();
    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};
