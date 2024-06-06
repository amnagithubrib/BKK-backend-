const { Model } = require("objection");
const Zone = require("./zone");

class Partner extends Model {
    static get tableName() {
        return "partners";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "address"],
            properties: {
                id: { type: "integer" },
                name: { type: "string" },
                contactInfo: { type: "string" },
                address: { type: "string" }
            }
        };
    }

    static get relationMappings() {
        return {
            zones: {
                relation: Model.HasManyRelation,
                modelClass: Zone,
                join: {
                    from: "partners.id",
                    to: "zones.partner_id"
                }
            }
        };
    }
}

module.exports = Partner;
