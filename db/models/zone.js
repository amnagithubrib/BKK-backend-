// // models/Zone.js
// const { Model } = require('objection');
// const Location = require('./Location');
// const Partner = require('./partners');

// class Zone extends Model {
//     static get tableName() {
//         return 'zones';
//     }

//     static get idColumn() {
//         return 'id';
//     }

//     static get relationMappings() {
//         return {
//             locations: {
//                 relation: Model.ManyToManyRelation,
//                 modelClass: Location,
//                 join: {
//                     from: 'zones.id',
//                     through: {
//                         from: 'zone_locations.zone_id',
//                         to: 'zone_locations.location_id'
//                     },
//                     to: 'locations.location_id'
//                 }
//             },
//             partner: {
//                 relation: Model.BelongsToOneRelation,
//                 modelClass: Partner,
//                 join: {
//                     from: 'zones.partner_id',
//                     to: 'partners.id'
//                 }
//             }
//         };
//     }
// }

// module.exports = Zone;

// // models/Zone.js
// const { Model } = require("objection");
// const Location = require("./locations");
// const Partner = require("./partners");

// class Zone extends Model {
//     static get tableName() {
//         return "zones";
//     }

//     static get idColumn() {
//         return "id";
//     }

//     static get relationMappings() {
//         return {
//             locations: {
//                 relation: Model.ManyToManyRelation,
//                 modelClass: Location,
//                 join: {
//                     from: "zones.id",
//                     through: {
//                         from: "zone_locations.zone_id",
//                         to: "zone_locations.location_id"
//                     },
//                     to: "locations.location_id"
//                 }
//             },
//             partner: {
//                 relation: Model.BelongsToOneRelation,
//                 modelClass: Partner,
//                 join: {
//                     from: "zones.partner_id",
//                     to: "partners.id"
//                 }
//             }
//         };
//     }
// }

// module.exports = Zone;
// models/Zone.js
const { Model } = require("objection");
const Location = require("./locations");
const Partner = require("./partners");

class Zone extends Model {
    static get tableName() {
        return "zones";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name"],
            properties: {
                id: { type: "integer" },
                partner_id: { type: "integer" },
                name: { type: "string", minLength: 1, maxLength: 255 },
                type: { type: "string", maxLength: 255 },
                geo_location_data: { type: "string" }
            }
        };
    }

    static get relationMappings() {
        return {
            locations: {
                relation: Model.ManyToManyRelation,
                modelClass: Location,
                join: {
                    from: "zones.id",
                    through: {
                        from: "zone_locations.zone_id",
                        to: "zone_locations.location_id"
                    },
                    to: "locations.location_id"
                }
            },
            partner: {
                relation: Model.BelongsToOneRelation,
                modelClass: Partner,
                join: {
                    from: "zones.partnerId",
                    to: "partners.id"
                }
            }
        };
    }
}

module.exports = Zone;
