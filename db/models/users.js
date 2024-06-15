const { Model } = require("objection");
class Users extends Model {
    static get tableName() {
        return "users";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["number", "pin"],
            properties: {
                id: { type: "integer" },
                number: { type: "number" },
                pin: { type: "integer" }
            }
        };
    }
}

module.exports = Users;
