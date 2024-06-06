// // LocationService.js

// const Locations = require("../db/models/locations");

// class LocationService {
//     static createLocation(data) {
//         return Locations.query().insert(data).returning("location_id");
//     }

//     static getAllLocations() {
//         return Locations.query();
//     }

//     static getLocationById(id) {
//         return Locations.query().findById(id);
//     }

//     static updateLocation(id, data) {
//         return Locations.query().patchAndFetchById(id, data).returning("location_id");
//     }

//     static deleteLocation(id) {
//         return Locations.query().deleteById(id);
//     }
// }

// module.exports = LocationService;
const Locations = require("../db/models/locations");

class LocationService {
    static createLocation(data) {
        return Locations.query().insert(data).returning("*"); // Ensure returning all columns
    }

    static getAllLocations() {
        return Locations.query();
    }

    static getLocationById(id) {
        return Locations.query().findById(id);
    }

    static updateLocation(id, data) {
        return Locations.query().patchAndFetchById(id, data).returning("*");
    }

    static deleteLocation(id) {
        return Locations.query().deleteById(id);
    }
}

module.exports = LocationService;
