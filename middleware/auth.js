require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../db/models/users");

exports.isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Please provide a valid token" });
        }

        const token = authHeader.split(" ")[1];
        const decodedData = jwt.verify(token, "amna");
        const user = await User.query().findById(decodedData.id);

        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = user;

        next();
    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
