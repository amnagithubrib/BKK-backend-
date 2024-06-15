const Zone = require("../db/models/zone");
const Location = require("../db/models/locations");

const ZoneService = {
    async createZone({ name, type, geoLocationData, partnerId }) {
        try {
            const newZone = await Zone.query().insert({
                name,
                type,
                geo_location_data: geoLocationData,
                partner_id: partnerId
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
                geo_location_data: geoLocationData,
                partner_id: partnerId
            });
            await newZone.$relatedQuery("locations").relate(locationIds);
            const zoneWithLocationsAndPartner = await Zone.query()
                .findById(newZone.id)
                .withGraphFetched("[locations, partner]");
            return zoneWithLocationsAndPartner;
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
                geo_location_data: geoLocationData
            });
            return updatedZone || null;
        } catch (error) {
            console.error("Error updating zone:", error);
            throw error;
        }
    }
};

module.exports = ZoneService;
