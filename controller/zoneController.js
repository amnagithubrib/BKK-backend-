// const zoneService = require("../services/zoneService");

// class ZoneController {
//     static async createZone(req) {
//         const { name, type, geoLocationData, partnerId } = req.body;
//         if (!name || !type || !geoLocationData || !partnerId) {
//             const error = new Error("Incomplete or invalid zone data.");
//             error.statusCode = 400;
//             throw error;
//         }
//         const zone = await zoneService.createZone({ name, type, geoLocationData, partnerId });
//         return { success: true, data: zone };
//     }

//     static async getAllZones(req) {
//         const zones = await zoneService.getAllZones();
//         return { success: true, data: zones };
//     }

//     static async getZoneById(req) {
//         const { id } = req.params;
//         const zone = await zoneService.getZoneById(id);
//         if (!zone) {
//             const error = new Error("Zone not found");
//             error.statusCode = 404;
//             throw error;
//         }
//         return { success: true, data: zone };
//     }

//     static async getLocationsByZoneId(req) {
//         const { id } = req.params;
//         const locations = await zoneService.getLocationsByZoneId(id);
//         if (!locations || locations.length === 0) {
//             const error = new Error("No locations found for the specified zone");
//             error.statusCode = 404;
//             throw error;
//         }
//         return { success: true, data: locations };
//     }

//     static async updateZone(req) {
//         const { id } = req.params;
//         const zone = await zoneService.updateZone(id, req.body);
//         if (!zone) {
//             const error = new Error("Zone not found");
//             error.statusCode = 404;
//             throw error;
//         }
//         return { success: true, data: zone };
//     }

//     static async deleteZone(req) {
//         const { id } = req.params;
//         const success = await zoneService.deleteZone(id);
//         if (!success) {
//             const error = new Error("Zone not found");
//             error.statusCode = 404;
//             throw error;
//         }
//         return { success: true, message: "Zone deleted successfully" };
//     }

//     static async createZoneWithLocations(req) {
//         const { name, type, geoLocationData, partnerId, locationIds } = req.body;
//         if (!name || !type || !geoLocationData || !partnerId || !Array.isArray(locationIds)) {
//             const error = new Error("Incomplete or invalid zone data.");
//             error.statusCode = 400;
//             throw error;
//         }
//         const zone = await zoneService.createZoneWithLocations({ name, type, geoLocationData, partnerId, locationIds });
//         return { success: true, data: zone };
//     }

//     static async getZoneWithLocations(req) {
//         const { id } = req.params;
//         const zone = await zoneService.getZoneWithLocations(id);
//         if (!zone) {
//             const error = new Error("Zone not found");
//             error.statusCode = 404;
//             throw error;
//         }
//         return { success: true, data: zone };
//     }
// }

// module.exports = ZoneController;
const zoneService = require("../services/zoneService");

async function createZone(req, res) {
    try {
        const { name, type, geoLocationData, partnerId } = req.body;
        const zone = await zoneService.createZone({ name, type, geoLocationData, partnerId });
        res.status(201).json(zone);
    } catch (error) {
        console.error("Error creating zone:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getAllZones(req, res) {
    try {
        const zones = await zoneService.getAllZones();
        res.json(zones);
    } catch (error) {
        console.error("Error fetching zones:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getZoneById(req, res) {
    try {
        const zone = await zoneService.getZoneById(req.params.id);
        if (!zone) {
            return res.status(404).json({ error: "Zone not found" });
        }
        res.json(zone);
    } catch (error) {
        console.error("Error fetching zone by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function createZoneWithLocations(req, res) {
    try {
        const { name, type, geoLocationData, partnerId, locationIds } = req.body;
        const zone = await zoneService.createZoneWithLocations({ name, type, geoLocationData, partnerId, locationIds });
        res.status(201).json(zone);
    } catch (error) {
        console.error("Error creating zone with locations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getZoneWithLocations(req, res) {
    try {
        const zone = await zoneService.getZoneWithLocations(req.params.id);
        if (!zone) {
            return res.status(404).json({ error: "Zone not found" });
        }
        res.json(zone);
    } catch (error) {
        console.error("Error fetching zone with locations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getLocationsByZoneId(req, res) {
    try {
        const { id } = req.params; // assuming you pass the zone id as a path parameter
        const locations = await zoneService.getLocationsByZoneId(id);
        if (locations && locations.length > 0) {
            res.status(200).json(locations);
        } else {
            res.status(404).json({ error: "No locations found for the specified zone" });
        }
    } catch (error) {
        console.error("Error fetching locations for zone:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateZone(req, res) {
    try {
        const zone = await zoneService.updateZone(req.params.id, req.body);
        if (!zone) {
            return res.status(404).json({ error: "Zone not found" });
        }
        res.json(zone);
    } catch (error) {
        console.error("Error updating zone:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function deleteZone(req, res) {
    try {
        const success = await zoneService.deleteZone(req.params.id);
        if (!success) {
            return res.status(404).json({ error: "Zone not found" });
        }
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting zone:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getZonesWithLocationsByPartnerId(req, res) {
    try {
        const { partnerId } = req.params; // assuming you pass the partner ID as a path parameter
        const zones = await zoneService.getZonesWithLocationsByPartnerId(partnerId);
        if (zones && zones.length > 0) {
            res.status(200).json(zones);
        } else {
            res.status(404).json({ error: "No zones found for the specified partner" });
        }
    } catch (error) {
        console.error("Error fetching zones with locations for partner:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    createZone,
    getAllZones,
    getZoneById,
    getZoneWithLocations,
    getLocationsByZoneId,
    updateZone,
    deleteZone,
    getZonesWithLocationsByPartnerId,
    createZoneWithLocations
};
