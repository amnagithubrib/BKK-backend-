const { Model } = require("objection");
class FormElement extends Model {
    static get tableName() {
        return "formElements";
    }

    static get idColumn() {
        return "elementId";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["elementLabel", "elementType", "isRequired"],
            properties: {
                elementId: { type: "integer" },
                elementLabel: { type: "string" },
                elementType: { type: "string", enum: ["text", "checkbox", "radio", "switch"] },
                isRequired: { type: "boolean" }
            }
        };
    }

    static get relationMappings() {
        const FormOption = require("./formOptions");
        return {
            options: {
                relation: Model.HasManyRelation,
                modelClass: FormOption,
                join: {
                    from: "formElements.elementId",
                    to: "formOptions.elementId"
                }
            }
        };
    }
}
module.exports = FormElement;
