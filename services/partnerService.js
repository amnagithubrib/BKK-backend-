const Partners = require("../db/models/partners");
require("dotenv").config();
const PartnersService = {
    async registerPartner(req, res) {
        try {
            const { name, email, address, password } = req.body;
            const newPartner = await PartnersService.registerPartner({ name, email, address, password });
            res.status(201).json(newPartner);
        } catch (error) {
            console.error("Error registering partner:", error);
            res.status(400).json({ error: error.message });
        }
    },

    async loginPartner(req, res) {
        try {
            const { email, password } = req.body;
            const { token, partner } = await PartnersService.loginPartner({ email, password });
            res.status(200).json({ token, partner });
        } catch (error) {
            console.error("Error logging in:", error);
            res.status(400).json({ error: error.message });
        }
    },
    async getAllPartners() {
        try {
            const partners = await Partners.query();
            return partners;
        } catch (error) {
            console.error("Error fetching all partners:", error);
            throw error;
        }
    },

    async getPartnerById(id) {
        try {
            const partner = await Partners.query().findById(id);
            return partner || null;
        } catch (error) {
            console.error("Error fetching partner by ID:", error);
            throw error;
        }
    },
    async logoutPartner() {
        return { success: true, message: "Logout successful" };
    }
};
module.exports = PartnersService;
