// ZoneController.js
const Zone = require('../db/models/zone');

class ZoneController {
    static async createZone(req, res) {
        const { name, type, geo_location_data, partner_id } = req.body;
        try {
            const newZone = await Zone.query().insert({
                name,
                type,
                geo_location_data,
                partner_id
            });
            res.status(200).json({ success: true, data: newZone });
        } catch (error) {
            console.error("Error creating zone:", error);
            res.status(500).json({ success: false, data: null });
        }
    }

    static async getAllZones(req, res) {
        try {
            const zones = await Zone.query();
            res.status(200).json({ success: true, data: zones });
        } catch (error) {
            console.error("Error fetching all zones:", error);
            res.status(500).json({ success: false, data: null });
        }
    }

    static async getZoneById(req, res) {
        const { id } = req.params;
        try {
            const zone = await Zone.query().findById(id);
            res.status(200).json({ success: true, data: zone || null });
        } catch (error) {
            console.error("Error fetching zone by ID:", error);
            res.status(500).json({ success: false, data: null });
        }
    }

    static async updateZone(req, res) {
        const { id } = req.params;
        const { name, type, geo_location_data } = req.body;
        try {
            const updatedZone = await Zone.query().patchAndFetchById(id, {
                name,
                type,
                geo_location_data
            });
            res.status(200).json({ success: true, data: updatedZone || null });
        } catch (error) {
            console.error("Error updating zone:", error);
            res.status(500).json({ success: false, data: null });
        }
    }

    static async deleteZone(req, res) {
        const { id } = req.params;
        try {
            const numDeleted = await Zone.query().deleteById(id);
            res.status(200).json({ success: true, message: numDeleted ? "Zone deleted successfully" : "Zone not found", data: null });
        } catch (error) {
            console.error("Error deleting zone:", error);
            res.status(500).json({ success: false, data: null });
        }
    }
}

module.exports = ZoneController;
