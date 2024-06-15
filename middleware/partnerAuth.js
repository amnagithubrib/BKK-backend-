require("dotenv").config(); // Load environment variables from .env file
const jwt = require("jsonwebtoken");
const Partner = require("../db/models/partners"); // Assuming you have a User model

exports.Authenticate = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Please provide a valid token" });
        }

        const token = authHeader.split(" ")[1];

        // Verify the token using the environment variable JWT_SECRET
        const decodedData = jwt.verify(token, "amna");

        // Find the user based on the decoded user ID
        const partner = await Partner.query().findById(decodedData.id);

        if (!partner) {
            throw new Error();
        }

        req.partner = partner;

        next();
    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
