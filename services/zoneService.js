// const Zone = require("../db/models/zone");
// const Location = require("../db/models/location");

// const ZoneService = {
//     async createZone({ name, type, geo_location_data, partner_id }) {
//         try {
//             const newZone = await Zone.query().insert({
//                 name,
//                 type,
//                 geo_location_data,
//                 partner_id
//             });
//             return newZone;
//         } catch (error) {
//             console.error("Error creating zone:", error);
//             throw error;
//         }
//     },
//     async createZoneWithLocations({ name, type, geo_location_data, partner_id, locationIds }) {
//         try {
//             // Insert the zone
//             const newZone = await Zone.query().insert({
//                 name,
//                 type,
//                 geo_location_data,
//                 partner_id
//             });

//             // Link the locations to the new zone using the provided location IDs
//             await newZone.$relatedQuery("locations").relate(locationIds);

//             // Fetch the zone with its related locations to include in the response
//             const zoneWithLocations = await Zone.query()
//                 .findById(newZone.id)
//                 .withGraphFetched("[locations, partner]");

//             return zoneWithLocations;
//         } catch (error) {
//             console.error("Error creating zone with locations:", error);
//             throw error;
//         }
//     },
//     async getAllZones() {
//         try {
//             const zones = await Zone.query().withGraphFetched("[locations, partner]");
//             return zones;
//         } catch (error) {
//             console.error("Error fetching all zones:", error);
//             throw error;
//         }
//     },

//     async getZoneById(id) {
//         try {
//             const zone = await Zone.query().findById(id);
//             return zone || null;
//         } catch (error) {
//             console.error("Error fetching zone by ID:", error);
//             throw error;
//         }
//     },

//     async getZoneWithLocations(id) {
//         try {
//             const zone = await Zone.query().findById(id)
//                 .withGraphFetched("[locations, partner]");

//             return zone || null;
//         } catch (error) {
//             console.error("Error fetching zone with locations:", error);
//             throw error;
//         }
//     },
//     async getLocationsByZoneId(zoneId) {
//         try {
//             const locations = await Location.query().where("zone_id", zoneId);
//             return locations;
//         } catch (error) {
//             console.error("Error fetching locations for zone:", error);
//             throw error;
//         }
//     },

//     async updateZone(id, { name, type, geo_location_data }) {
//         try {
//             const updatedZone = await Zone.query().patchAndFetchById(id, {
//                 name,
//                 type,
//                 geo_location_data
//             });
//             return updatedZone || null;
//         } catch (error) {
//             console.error("Error updating zone:", error);
//             throw error;
//         }
//     },

//     // current code
//     async getZonesWithLocationsByPartnerId(partnerId) {
//         try {
//             const zones = await Zone.query()
//                 .where("partner_id", partnerId)
//                 .withGraphFetched("locations");
//             return zones;
//         } catch (error) {
//             console.error("Error fetching zones with locations for partner:", error);
//             throw error;
//         }
//     },
//     async deleteZone(id) {
//         try {
//             const numDeleted = await Zone.query().deleteById(id);
//             return numDeleted > 0;
//         } catch (error) {
//             console.error("Error deleting zone:", error);
//             throw error;
//         }
//     }
// };

// module.exports = ZoneService;
const Zone = require("../db/models/zone");
const Location = require("../db/models/locations");

const ZoneService = {
    async createZone({ name, type, geoLocationData, partnerId }) {
        try {
            const newZone = await Zone.query().insert({
                name,
                type,
                geoLocationData, // Convert to snake_case
                partnerId // Convert to snake_case
            });
            return newZone;
        } catch (error) {
            console.error("Error creating zone:", error);
            throw error;
        }
    },

    async createZoneWithLocations({ name, type, geoLocationData, partnerId, locationIds }) {
        try {
            const newZone = await Zone.query().insert({
                name,
                type,
                geo_location_data: geoLocationData, // Convert to snake_case
                partner_id: partnerId // Convert to snake_case
            });

            await newZone.$relatedQuery("locations").relate(locationIds);

            const zoneWithLocations = await Zone.query()
                .findById(newZone.id)
                .withGraphFetched("[locations, partner]");

            return zoneWithLocations;
        } catch (error) {
            console.error("Error creating zone with locations:", error);
            throw error;
        }
    },

    async getAllZones() {
        try {
            const zones = await Zone.query().withGraphFetched("[locations, partner]");
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

    async getZoneWithLocations(id) {
        try {
            const zone = await Zone.query().findById(id)
                .withGraphFetched("[locations, partner]");

            return zone || null;
        } catch (error) {
            console.error("Error fetching zone with locations:", error);
            throw error;
        }
    },

    async getLocationsByZoneId(zoneId) {
        try {
            const locations = await Location.query().where("zone_id", zoneId);
            return locations;
        } catch (error) {
            console.error("Error fetching locations for zone:", error);
            throw error;
        }
    },

    async updateZone(id, { name, type, geoLocationData }) {
        try {
            const updatedZone = await Zone.query().patchAndFetchById(id, {
                name,
                type,
                geo_location_data: geoLocationData // Convert to snake_case
            });
            return updatedZone || null;
        } catch (error) {
            console.error("Error updating zone:", error);
            throw error;
        }
    },

    async getZonesWithLocationsByPartnerId(partnerId) {
        try {
            const zones = await Zone.query()
                .where("partner_id", partnerId)
                .withGraphFetched("locations");
            return zones;
        } catch (error) {
            console.error("Error fetching zones with locations for partner:", error);
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
