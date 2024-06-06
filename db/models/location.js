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

// models/Location.js
const { Model } = require("objection");

class Location extends Model {
    static get tableName() {
        return "locations";
    }

    static get idColumn() {
        return "location_id";
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
