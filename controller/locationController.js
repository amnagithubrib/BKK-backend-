const LocationService = require('../services/locationService');

class LocationController {
    static async createLocation(req, res) {
        try {
            const { zone_id, latitude, longitude, geo_polygon } = req.body;
            const newLocation = await LocationService.createLocation({ zone_id, latitude, longitude, geo_polygon });
            res.status(200).json({ success: true, data: newLocation });
        } catch (error) {
            console.error("Error creating location:", error);
            res.status(500).json({ success: false, data: null });
        }
    }

    static async getAllLocations(req, res) {
        try {
            const locations = await LocationService.getAllLocations();
            res.status(200).json({ success: true, data: locations });
        } catch (error) {
            console.error("Error fetching all locations:", error);
            res.status(500).json({ success: false, data: null });
        }
    }

    static async getLocationById(req, res) {
        const { id } = req.params;
        try {
            const location = await LocationService.getLocationById(id);
            res.status(200).json({ success: true, data: location || null });
        } catch (error) {
            console.error("Error fetching location by ID:", error);
            res.status(500).json({ success: false, data: null });
        }
    }

    static async updateLocation(req, res) {
        const { id } = req.params;
        const { zone_id, latitude, longitude, geo_polygon } = req.body;
        try {
            const updatedLocation = await LocationService.updateLocation(id, { zone_id, latitude, longitude, geo_polygon });
            res.status(200).json({ success: true, data: updatedLocation || null });
        } catch (error) {
            console.error("Error updating location:", error);
            res.status(500).json({ success: false, data: null });
        }
    }

    static async deleteLocation(req, res) {
        const { id } = req.params;
        try {
            const numDeleted = await LocationService.deleteLocation(id);
            if (numDeleted) {
                res.status(200).json({ success: true, message: "Location deleted successfully", data: null });
            } else {
                res.status(404).json({ success: false, message: "Location not found", data: null });
            }
        } catch (error) {
            console.error("Error deleting location:", error);
            res.status(500).json({ success: false, data: null });
        }
    }
}

module.exports = LocationController;
