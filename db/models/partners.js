const { Model } = require('objection');
const Locations = require('./location'); 
const Zone = require('./zone'); 
class Partners extends Model {
    static get tableName() {
        return 'partners';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'contact_info', 'address'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                contact_info: { type: 'string' },
                address: { type: 'string' }
            }
        };
    }
    static get relationMappings() {
        return {
           
            zone: {
                relation: Model.HasOneRelation,
                modelClass: Zone,
                join: {
                    from: 'partners.zone_id',
                    to: 'zones.id'
                }
        }
    }
}}

module.exports = Partners;
