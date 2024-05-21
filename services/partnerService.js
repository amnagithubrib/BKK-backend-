const Partners = require('../db/models/partners');

const PartnersService = {
    async createPartner({ name, contact_info, address }) {
        try {
            const newPartner = await Partners.query().insert({
                name,
                contact_info,
                address
            });
            return newPartner;
        } catch (error) {
            console.error("Error creating partner:", error);
            throw error;
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

    async updatePartner(id, { name, contact_info, address }) {
        try {
            const updatedPartner = await Partners.query().patchAndFetchById(id, {
                name,
                contact_info,
                address
            });
            return updatedPartner || null;
        } catch (error) {
            console.error("Error updating partner:", error);
            throw error;
        }
    },

    async deletePartner(id) {
        try {
            const numDeleted = await Partners.query().deleteById(id);
            return numDeleted > 0;
        } catch (error) {
            console.error("Error deleting partner:", error);
            throw error;
        }
    }
};

module.exports = PartnersService;
