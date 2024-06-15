const { Model } = require("objection");

class Partner extends Model {
    static get tableName() {
        return "partners";
    }

    static get jsonSchema() {
        return {
            type: "object",
            properties: {
                id: { type: "integer" },
                name: { type: "string" },
                email: { type: "string" },
                address: { type: "string" },
                password: { type: "string" }
            }
        };
    }

    static get relationMappings() {
        return {
            zones: {
                relation: Model.HasManyRelation,
                modelClass: require("./zone"),
                join: {
                    from: "partners.id",
                    to: "zones.partnerId"
                }
            }
        };
    }
}

module.exports = Partner;
