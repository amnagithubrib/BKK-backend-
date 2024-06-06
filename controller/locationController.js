const LocationService = require("../services/locationService");

class LocationController {
    static async createLocation(req) {
        const { name, latitude, longitude, geoPolygon, zoneId } = req.body;
        const data = { name, latitude, longitude, geoPolygon, zoneId };
        return await this.handleOperation(async () => {
            const newLocation = await LocationService.createLocation(data);
            return { message: "Location created successfully", data: newLocation, statusCode: 201 };
        });
    }

    static async getAllLocations() {
        return await this.handleOperation(async () => {
            const locations = await LocationService.getAllLocations();
            return { message: "Locations retrieved successfully", data: locations, statusCode: 200 };
        });
    }

    static async getLocationById(req) {
        const { id } = req.params;
        return await this.handleOperation(async () => {
            const location = await LocationService.getLocationById(id);
            return { message: "Location retrieved successfully", data: location || null, statusCode: location ? 200 : 404 };
        });
    }

    static async updateLocation(req) {
        const { id } = req.params;
        const { name, latitude, longitude, geoPolygon, zoneId } = req.body;
        const data = { name, latitude, longitude, geoPolygon, zoneId };
        return await this.handleOperation(async () => {
            const updatedLocation = await LocationService.updateLocation(id, data);
            return { message: "Location updated successfully", data: updatedLocation || null, statusCode: updatedLocation ? 200 : 404 };
        });
    }

    static async deleteLocation(req) {
        const { id } = req.params;
        return await this.handleOperation(async () => {
            const numDeleted = await LocationService.deleteLocation(id);
            return numDeleted
                ? { message: "Location deleted successfully", data: null, statusCode: 200 }
                : { message: "Location not found", data: null, statusCode: 404 };
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
}

module.exports = LocationController;
