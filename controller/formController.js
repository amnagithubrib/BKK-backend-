// const FormService = require("../services/formService");
// class FormController {
//     static async createFormElement(req, res) {
//         const { elementLabel, elementType, isRequired, options } = req.body;
//         if (!elementLabel || !elementType || isRequired === undefined) {
//             const error = new Error("Incomplete or invalid form data.");

//             throw error;
//         }
//         if (options && (!Array.isArray(options) || options.some(option => !option.optionText || !option.optionValue))) {
//             const error = new Error("Invalid option format.");

//             throw error;
//         }
//         const formElementData = { elementLabel, elementType, isRequired };
//         const newFormElement = await FormService.createFormElementWithOption({
//             formElementData,
//             formOptionData: options || []
//         });
//         return { success: true, data: newFormElement };
//     }

//     static async getFormElement(req) {
//         const { id } = req.params;
//         const formElement = await FormService.getFormElementById(id);
//         if (!formElement) {
//             const error = new Error("Form element not found");
//             error.statusCode = 404;
//             throw error;
//         }
//         return { success: true, data: formElement };
//     }

//     static async getAllFormElements(req) {
//         const formElements = await FormService.getAllFormElements();
//         return { success: true, data: formElements };
//     }
// }

// module.exports = FormController;
const FormService = require("../services/formService");

class FormController {
    static async createFormElement(req, res) {
        const { elementLabel, elementType, isRequired, options, regex } = req.body
        // Validate required fields
        if (!elementLabel || !elementType || isRequired === undefined) {
            const error = new Error("Incomplete or invalid form data.");
            error.statusCode = 400;
            throw error;
        }

        // Validate options format for select fields
        if (options && (!Array.isArray(options) || options.some(option => !option.optionText || !option.optionValue))) {
            const error = new Error("Invalid option format.");
            error.statusCode = 400;
            throw error;
        }

        // Validate regex format for text fields
        if (elementType === "text" && regex && typeof regex !== "string") {
            const error = new Error("Invalid regex format.");
            error.statusCode = 400;
            throw error;
        }

        const formElementData = { elementLabel, elementType, isRequired, regex };
        const newFormElement = await FormService.createFormElementWithOption({
            formElementData,
            formOptionData: options || []
        });

        return { success: true, data: newFormElement };
    }

    static async getFormElement(req) {
        const { id } = req.params;
        const formElement = await FormService.getFormElementById(id);

        if (!formElement) {
            const error = new Error("Form element not found");
            error.statusCode = 404;
            throw error;
        }

        return { success: true, data: formElement };
    }

    static async getAllFormElements(req) {
        const formElements = await FormService.getAllFormElements();
        return { success: true, data: formElements };
    }
}

module.exports = FormController;
