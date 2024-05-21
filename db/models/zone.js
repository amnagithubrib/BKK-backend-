const { Model } = require('objection');
const Locations = require('./location');
const Partners= require('./partners');  // make sure this path is correct

class Zones extends Model {
    static get tableName() {
        return 'zones';
    }

    static get idColumn() {
        return 'id';  // This explicitly defines the primary key column
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'type', 'geo_location_data'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                type: { type: 'string' },
                geo_location_data: { type: 'string', contentEncoding: 'text' }
            }
        };
    }

    static get relationMappings() {
        return {
            locations: {
                relation: Model.HasManyRelation,
                modelClass: Locations,
                join: {
                    from: 'zones.id',
                    to: 'locations.zone_id'
                }
            },
            partners: {
                relation: Model.HasOneRelation,
                modelClass: Partners,
                join: {
                    from: 'zones.id',
                    to: 'partners.zone_id'
                }
            },
        };
    }
}

module.exports = Zones;
