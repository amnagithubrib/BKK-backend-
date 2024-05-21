const Zone = require('../db/models/zone');

const ZoneService = {
    async createZone({ name, type, geo_location_data, partner_id }) {
        try {
            const newZone = await Zone.query().insert({
                name,
                type,
                geo_location_data,
                partner_id
            });
            return newZone;
        } catch (error) {
            console.error("Error creating zone:", error);
            throw error;
        }
    },

    async getAllZones() {
        try {
            const zones = await Zone.query();
            return zones;
        } catch (error) {
            console.error("Error fetching all zones:", error);
            throw error;
        }
    },

    async getZoneById(id) {
        try {
            const zone = await Zone.query().findById(id);
            return zone || null;
        } catch (error) {
            console.error("Error fetching zone by ID:", error);
            throw error;
        }
    },

    async updateZone(id, { name, type, geo_location_data }) {
        try {
            const updatedZone = await Zone.query().patchAndFetchById(id, {
                name,
                type,
                geo_location_data
            });
            return updatedZone || null;
        } catch (error) {
            console.error("Error updating zone:", error);
            throw error;
        }
    },

    async deleteZone(id) {
        try {
            const numDeleted = await Zone.query().deleteById(id);
            return numDeleted > 0;
        } catch (error) {
            console.error("Error deleting zone:", error);
            throw error;
        }
    }
};

module.exports = ZoneService;
