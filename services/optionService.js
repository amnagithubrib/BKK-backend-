// const FormOptions = require('../db/models/formOptions');
// const FormElements = require('../db/models/formElement');


// class FormOptionsService {
//     static async createFormOptions({ optionText, optionValue, type, element_id}) {
         
        
//         const newOption=await FormOptions.query().insert({ optionText, optionValue, type, element_id });
//         return newOption;
//     }
//     static async getAllFormOptions() {
//         return await FormOptions.query();
//     }

//     static async getFormOptionById(id) {
//         return await FormOptions.query().findById(id);
//     }

//     static async updateFormOption(id, { optionText, optionValue, type, element_id }) {
//         return await FormOptions.query().patchAndFetchById(id, { optionText, optionValue, type, element_id });
//     }

//     static async deleteFormOption(id) {
//         return await FormOptions.query().deleteById(id);
//     }
// }

// module.exports = FormOptionsService;
