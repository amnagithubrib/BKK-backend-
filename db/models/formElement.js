// // const { Model } = require("objection");
// // class FormElement extends Model {
// //     static get tableName() {
// //         return "formElements";
// //     }

// //     static get idColumn() {
// //         return "elementId";
// //     }

// //     static get jsonSchema() {
// //         return {
// //             type: "object",
// //             required: ["elementLabel", "elementType", "isRequired"],
// //             properties: {
// //                 elementId: { type: "integer" },
// //                 elementLabel: { type: "string" },
// //                 elementType: { type: "string", enum: ["text", "checkbox", "radio", "switch"] },
// //                 isRequired: { type: "boolean" }
// //             }
// //         };
// //     }

// //     static get relationMappings() {
// //         const FormOption = require("./formOptions");
// //         return {
// //             options: {
// //                 relation: Model.HasManyRelation,
// //                 modelClass: FormOption,
// //                 join: {
// //                     from: "formElements.elementId",
// //                     to: "formOptions.elementId"
// //                 }
// //             }
// //         };
// //     }
// // }
// // module.exports = FormElement;
// const { Model } = require("objection");

// class FormElement extends Model {
//     static get tableName() {
//         return "formElements";
//     }

//     static get idColumn() {
//         return "elementId";
//     }

//     static get jsonSchema() {
//         return {
//             type: "object",
//             required: ["elementLabel", "elementType", "isRequired"],
//             properties: {
//                 elementId: { type: "integer" },
//                 elementLabel: { type: "string" },
//                 elementType: { type: "string", enum: ["text", "checkbox", "radio", "switch", "date", "time"] },
//                 isRequired: { type: "boolean" },
//                 dateCreated: { type: "string", format: "date-time" },
//                 image: { type: "string" }
//                 // picture: { type: ["string", "null"], format: "uri", nullable: true },
//                 // audio: { type: ["string", "null"], format: "uri", nullable: true },
//                 // video: { type: ["string", "null"], format: "uri", nullable: true }
//             }
//         };
//     }

//     static get relationMappings() {
//         const FormOption = require("./formOptions");
//         return {
//             options: {
//                 relation: Model.HasManyRelation,
//                 modelClass: FormOption,
//                 join: {
//                     from: "formElements.elementId",
//                     to: "formOptions.elementId"
//                 }
//             }
//         };
//     }
// }

// module.exports = FormElement;
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
                elementType: { type: "string", enum: ["text", "checkbox", "radio", "switch", "image", "audio", "vedio"] },
                isRequired: { type: "boolean" },
                dateCreated: { type: "string", format: "date-time" },
                // image: { type: "string" },
                selectedDate: { type: ["string", "null"], format: "date", nullable: true },
                selectedTime: { type: ["string", "null"], format: "time", nullable: true }
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
