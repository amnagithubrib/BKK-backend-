require("dotenv").config();
const jwt = require("jsonwebtoken");
const Partners = require("../db/models/partners"); // Adjust the path as necessary

exports.Authenticated = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Please provide a valid token" });
        }

        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET || "amna";
        const decodedData = jwt.verify(token, secret);

        const user = await Partners.query().findById(decodedData.id);

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
