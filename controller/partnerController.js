
// const Partners = require('../db/models/partners');

// class PartnersController {
//     static async createPartner(req, res) {
//         const { name, contact_info, address } = req.body;
//         try {
//             const newPartner = await Partners.query().insert({
//                 name,
//                 contact_info,
//                 address
//             });
//             res.status(200).json({ success: true, data: newPartner });
//         } catch (error) {
//             console.error("Error creating partner:", error);
//             res.status(500).json({ success: false, data: null });
//         }
//     }

//     static async getAllPartners(req, res) {
//         try {
//             const partners = await Partners.query();
//             res.status(200).json({ success: true, data: partners });
//         } catch (error) {
//             console.error("Error fetching all partners:", error);
//             res.status(500).json({ success: false, data: null });
//         }
//     }

//     static async getPartnerById(req, res) {
//         const { id } = req.params;
//         try {
//             const partner = await Partners.query().findById(id);
//             res.status(200).json({ success: true, data: partner || null });
//         } catch (error) {
//             console.error("Error fetching partner by ID:", error);
//             res.status(500).json({ success: false, data: null });
//         }
//     }

//     static async updatePartner(req, res) {
//         const { id } = req.params;
//         const { name, contact_info, address } = req.body;
//         try {
//             const updatedPartner = await Partners.query().patchAndFetchById(id, {
//                 name,
//                 contact_info,
//                 address
//             });
//             res.status(200).json({ success: true, data: updatedPartner || null });
//         } catch (error) {
//             console.error("Error updating partner:", error);
//             res.status(500).json({ success: false, data: null });
//         }
//     }

//     static async deletePartner(req, res) {
//         const { id } = req.params;
//         try {
//             const numDeleted = await Partners.query().deleteById(id);
//             res.status(200).json({ success: true, message: numDeleted ? "Partner deleted successfully" : "Partner not found", data: null });
//         } catch (error) {
//             console.error("Error deleting partner:", error);
//             res.status(500).json({ success: false, data: null });
//         }
//     }
// }

// module.exports = PartnersController;




const Partners = require('../db/models/partners');

class PartnersController {
    static async createPartner(req, res) {
        const { name, contact_info, address } = req.body;
        try {
            const newPartner = await Partners.query().insert({
                name,
                contact_info,
                address
            });
            res.status(200).json({ success: true, data: newPartner });
        } catch (error) {
            console.error("Error creating partner:", error);
            res.status(500).json({ success: false, data: null });
        }
    }

    static async getAllPartners(req, res) {
        try {
            const partners = await Partners.query();
            res.status(200).json({ success: true, data: partners });
        } catch (error) {
            console.error("Error fetching all partners:", error);
            res.status(500).json({ success: false, data: null });
        }
    }

    static async getPartnerById(req, res) {
        const { id } = req.params;
        try {
            const partner = await Partners.query().findById(id);
            res.status(200).json({ success: true, data: partner || null });
        } catch (error) {
            console.error("Error fetching partner by ID:", error);
            res.status(500).json({ success: false, data: null });
        }
    }

    static async updatePartner(req, res) {
        const { id } = req.params;
        const { name, contact_info, address } = req.body;
        try {
            const updatedPartner = await Partners.query().patchAndFetchById(id, {
                name,
                contact_info,
                address
            });
            res.status(200).json({ success: true, data: updatedPartner || null });
        } catch (error) {
            console.error("Error updating partner:", error);
            res.status(500).json({ success: false, data: null });
        }
    }

    static async deletePartner(req, res) {
        const { id } = req.params;
        try {
            const numDeleted = await Partners.query().deleteById(id);
            res.status(200).json({ success: true, message: numDeleted ? "Partner deleted successfully" : "Partner not found", data: null });
        } catch (error) {
            console.error("Error deleting partner:", error);
            res.status(500).json({ success: false, data: null });
        }
    }
}

module.exports = PartnersController;
