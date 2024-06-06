// const { Model } = require('objection');

// class Location extends Model {
//     static get tableName() {
//         return 'locations';
//     }

//     static get idColumn() {
//         return 'location_id';
//     }

//     static get relationMappings() {
//         const Zone = require('./zone');

//         return {
//             zones: {
//                 relation: Model.ManyToManyRelation,
//                 modelClass: Zone,
//                 join: {
//                     from: 'locations.location_id',
//                     through: {
//                         from: 'zone_locations.location_id',
//                         to: 'zone_locations.zone_id'
//                     },
//                     to: 'zones.id'
//                 }
//             }
//         };
//     }
// }

// module.exports = Location;

// // models/Location.js
// const { Model } = require("objection");

// class Location extends Model {
//     static get tableName() {
//         return "locations";
//     }

//     static get idColumn() {
//         return "location_id";
//     }

//     static get jsonSchema() {
//         return {
//             type: "object",
//             required: ["name", "latitude", "longitude"],
//             properties: {
//                 location_id: { type: "integer" },
//                 name: { type: "string" },
//                 latitude: { type: "number" },
//                 longitude: { type: "number" },
//                 geo_polygon: { type: "string" }
//             }
//         };
//     }

//     static get relationMappings() {
//         const Zone = require("./zone");

//         return {
//             zones: {
//                 relation: Model.ManyToManyRelation,
//                 modelClass: Zone,
//                 join: {
//                     from: "locations.location_id",
//                     through: {
//                         from: "zone_locations.location_id",
//                         to: "zone_locations.zone_id"
//                     },
//                     to: "zones.id"
//                 }
//             }
//         };
//     }
// }

// module.exports = Location;
const { Model } = require("objection");

class Location extends Model {
    static get tableName() {
        return "locations";
    }

    static get idColumn() {
        return "location_id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "latitude", "longitude"], // Include zone_id as required
            properties: {
                location_id: { type: "integer" },
                name: { type: "string" },
                latitude: { type: "number" },
                longitude: { type: "number" },
                geoPolygon: { type: "string" }
            }
        };
    }

    static get relationMappings() {
        const Zone = require("./zone");

        return {
            zones: {
                relation: Model.ManyToManyRelation,
                modelClass: Zone,
                join: {
                    from: "locations.location_id",
                    through: {
                        from: "zone_locations.location_id",
                        to: "zone_locations.zone_id"
                    },
                    to: "zones.id"
                }
            }
        };
    }
}

module.exports = Location;
