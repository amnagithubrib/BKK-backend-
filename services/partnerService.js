// const Partners = require("../db/models/partners");
// require("dotenv").config();
// const PartnersService = {
//     async registerPartner(req, res) {
//         try {
//             const { name, email, address, password } = req.body;
//             const newPartner = await PartnersService.registerPartner({ name, email, address, password });
//             res.status(201).json(newPartner);
//         } catch (error) {
//             console.error("Error registering partner:", error);
//             res.status(400).json({ error: error.message });
//         }
//     },

//     async loginPartner(req, res) {
//         try {
//             const { email, password } = req.body;
//             const { token, partner } = await PartnersService.loginPartner({ email, password });
//             res.status(200).json({ token, partner });
//         } catch (error) {
//             console.error("Error logging in:", error);
//             res.status(400).json({ error: error.message });
//         }
//     },
//     async getAllPartners() {
//         try {
//             const partners = await Partners.query();
//             return partners;
//         } catch (error) {
//             console.error("Error fetching all partners:", error);
//             throw error;
//         }
//     },

//     async getPartnerById(id) {
//         try {
//             const partner = await Partners.query().findById(id);
//             return partner || null;
//         } catch (error) {
//             console.error("Error fetching partner by ID:", error);
//             throw error;
//         }
//     },
//     async logoutPartner() {
//         return { success: true, message: "Logout successful" };
//     }
// };
// module.exports = PartnersService;
const Partners = require("../db/models/partners");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class PartnersService {
    static async getAllPartners() {
        try {
            return await Partners.query();
        } catch (error) {
            console.error("Error fetching all partners:", error);
            throw error;
        }
    }

    static async createPartner(data) {
        const { name, email, address } = data;
        try {
            return await Partners.query().insert({ name, email, address });
        } catch (error) {
            console.error("Error creating partner:", error);
            throw error;
        }
    }

    static async loginPartner(data) {
        const { email, password } = data;
        try {
            const partner = await Partners.query().findOne({ email });
            if (!partner) {
                throw new Error("No partner found with this email");
            }

            const isPasswordValid = await bcrypt.compare(password, partner.password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }

            const secret = process.env.JWT_SECRET || "amna";
            const token = jwt.sign({ id: partner.id, role: partner.role }, secret, { expiresIn: "1h" });

            return { token, partner };
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    }

    static async registerPartner(data) {
        const { name, email, address, password, role = "partner" } = data;
        try {
            const existingUser = await Partners.query().findOne({ email });
            if (existingUser) {
                throw new Error("Email already in use");
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            return await Partners.query().insert({
                name,
                email,
                address,
                password: hashedPassword,
                role
            });
        } catch (error) {
            console.error("Error during signup:", error);
            throw error;
        }
    }

    static async getPartnerById(id) {
        try {
            return await Partners.query().findById(id) || null;
        } catch (error) {
            console.error("Error fetching partner by ID:", error);
            throw error;
        }
    }

    static async logoutPartner() {
        return { success: true, message: "Logout successful" };
    }
}

module.exports = PartnersService;
