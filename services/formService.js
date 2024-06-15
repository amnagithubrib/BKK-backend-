const FormElement = require("../db/models/formElement");
class FormService {
    static async createFormElementWithOption(data) {
        const { formElementData, formOptionData } = data;

        try {
            return await FormElement.transaction(async (trx) => {
                const insertedFormElement = await FormElement.query(trx).insertGraph({
                    ...formElementData,
                    options: formOptionData.map(option => ({
                        optionText: option.optionText,
                        optionValue: option.optionValue,
                        // type: option.type,
                        elementId: formElementData.elementId
                    }))
                });

                return insertedFormElement;
            });
        } catch (error) {
            console.error("Error creating form element with option:", error.message);
            throw error;
        }
    }

    static async getFormElementById(id) {
        try {
            const formElement = await FormElement.query().findById(id).withGraphFetched("options");
            return formElement;
        } catch (error) {
            console.error("Error fetching form element by ID:", error.message);
            throw error;
        }
    }

    static async getAllFormElements() {
        try {
            console.log("service");
            const formElements = await FormElement.query().withGraphFetched("options");
            return formElements;
        } catch (error) {
            console.error("Error fetching all form elements:", error.message);
            throw error;
        }
    }
}
module.exports = FormService;
