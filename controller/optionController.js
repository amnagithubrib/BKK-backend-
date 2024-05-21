

// const FormOptionsService = require('../services/optionService');
// const FormElements = require('../db/models/formElement');

// class FormOptionsController {
//     static async createFormOption(req, res) {
//         try {
//             const { optionText, optionValue, type, element_id } = req.body;
//             const elementExists = await FormElements.query().findById(element_id);
//             if (!elementExists) {
//                 return res.status(400).json({ success: false, message: 'Element with the provided ID does not exist' });
//             }
//             const newFormOption = await FormOptionsService.createFormOptions({ optionText, optionValue, type, element_id });
//             res.status(201).json({ success: true, data: newFormOption });
//         } catch (error) {
//             console.error("Error creating form option:", error);
//             res.status(500).json({ success: false, message: "Internal server error" });
//         }
//     }

//     static async getAllFormOptions(req, res) {
//         try {
//             const formOptions = await FormOptionsService.getAllFormOptions();
//             res.status(200).json({ success: true, data: formOptions });
//         } catch (error) {
//             console.error("Error fetching all form options:", error);
//             res.status(500).json({ success: false, message: "Internal server error" });
//         }
//     }

//     static async getFormOptionById(req, res) {
//         const { id } = req.params;
//         try {
//             const formOption = await FormOptionsService.getFormOptionById(id);
//             res.status(200).json({ success: true, data: formOption || null });
//         } catch (error) {
//             console.error("Error fetching form option by ID:", error);
//             res.status(500).json({ success: false, message: "Internal server error" });
//         }
//     }

//     static async updateFormOption(req, res) {
//         const { id } = req.params;
//         const { optionText, optionValue, type, element_id } = req.body;
//         try {
//             const updatedFormOption = await FormOptionsService.updateFormOption(id, { optionText, optionValue, type, element_id });
//             res.status(200).json({ success: true, data: updatedFormOption || null });
//         } catch (error) {
//             console.error("Error updating form option:", error);
//             res.status(500).json({ success: false, message: "Internal server error" });
//         }
//     }

//     static async deleteFormOption(req, res) {
//         const { id } = req.params;
//         try {
//             await FormOptionsService.deleteFormOption(id);
//             res.status(200).json({ success: true, message: "Form option deleted successfully" });
//         } catch (error) {
//             console.error("Error deleting form option:", error);
//             res.status(500).json({ success: false, message: "Internal server error" });
//         }
//     }
// }

// module.exports = FormOptionsController;
