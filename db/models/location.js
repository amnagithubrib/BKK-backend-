const { Model } = require('objection');
const Zones=require('./zone');
class Locations extends Model {
    static get tableName() {
        return 'locations';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['zone_id', 'latitude', 'longitude'],
            properties: {
                location_id: { type: 'integer' },
                zone_id: { type: 'integer' },
                latitude: { type: 'number', format: 'float' },
                longitude: { type: 'number', format: 'float' },
                geo_polygon: { type: ['string', 'null'], contentEncoding: 'utf-8', contentMediaType: 'application/json', description: 'Optional, stores custom location data in GeoJSON format' }
            }
        };
    }
    
}
module.exports = Locations;
