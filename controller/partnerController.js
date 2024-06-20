const Partners = require("../db/models/partners");
const PartnersService = require("../services/partnerService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

class PartnersController {
    static async getAllPartners() {
        return await this.handleOperation(async () => {
            const partners = await Partners.query();
            return { message: "Partners retrieved successfully", data: partners, statusCode: 200 };
        });
    }

    static async createPartner(req, res) {
        const { name, email, address } = req.body;
        try {
            const newPartner = await Partners.query().insert({ name, email, address });
            res.status(201).json({ message: "Partner created successfully", data: newPartner });
        } catch (error) {
            console.error("Error creating partner:", error);
            res.status(500).json({ message: "Failed to create partner", error: error.message });
        }
    }

    static async loginPartner(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ success: false, message: "Email and password are required." });
            }

            const partner = await Partners.query().findOne({ email });
            if (!partner) {
                return res.status(401).json({ success: false, message: "No partner found with this email" });
            }

            const token = jwt.sign({ id: partner.id }, "amna", { expiresIn: "1h" });
            res.status(200).json({ success: true, message: "Login successful", token, partner });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    static async registerPartner(req, res) {
        try {
            const { name, email, address, password } = req.body;
            if (!name || !email || !address || !password) {
                return res.status(400).json({ success: false, message: "All fields are required." });
            }
            const existingUser = await Partners.query().findOne({ email });
            if (existingUser) {
                return res.status(409).json({ success: false, message: "Email already in use" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await Partners.query().insert({
                name,
                email,
                address,
                password: hashedPassword
            });
            if (!newUser) {
                return res.status(200).json({ success: true, message: "Signup successful" });
            }
            res.status(201).json({ success: true, data: { id: newUser.id, name: newUser.name, address: newUser.address } });
        } catch (error) {
            console.error("Error during signup:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    static async getPartnerById(req) {
        const { id } = req.params;
        return await this.handleOperation(async () => {
            const partner = await Partners.query().findById(id);
            if (!partner) {
                return { message: "Partner not found", data: null, statusCode: 404 };
            }
            return { message: "Partner retrieved successfully", data: partner, statusCode: 200 };
        });
    }

    static async handleOperation(operation) {
        try {
            return await operation();
        } catch (error) {
            console.error("Error:", error);
            const statusCode = error.statusCode || 500;
            return { message: "Internal server error", data: null, statusCode };
        }
    }

    static async logoutPartner(req, res) {
        try {
            const result = await PartnersService.logoutPartner();
            res.status(200).json(result);
        } catch (error) {
            console.error("Error during logout:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
}
module.exports = PartnersController;
