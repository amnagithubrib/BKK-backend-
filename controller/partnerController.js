const Partners = require("../db/models/partners");

class PartnersController {
    static async createPartner(req) {
        const { name, contactInfo, address } = req.body;
        const data = { name, contact_info: contactInfo, address };
        return await this.handleOperation(async () => {
            const newPartner = await Partners.query().insert(data);
            return { message: "Partner created successfully", data: newPartner, statusCode: 201 };
        });
    }

    static async getAllPartners() {
        return await this.handleOperation(async () => {
            const partners = await Partners.query();
            return { message: "Partners retrieved successfully", data: partners, statusCode: 200 };
        });
    }

    static async getPartnerById(req) {
        const { id } = req.params;
        return await this.handleOperation(async () => {
            const partner = await Partners.query().findById(id);
            if (!partner) {
                return { message: "Partner not found", data: null, statusCode: 404 };
            }
            return { message: "Partner retrieved successfully", data: partner, statusCode: 200 };
        });
    }

    static async updatePartner(req) {
        const { id } = req.params;
        const { name, contactInfo, address } = req.body;
        const data = { name, contact_info: contactInfo, address };
        return await this.handleOperation(async () => {
            const updatedPartner = await Partners.query().patchAndFetchById(id, data);
            if (!updatedPartner) {
                return { message: "Partner not found", data: null, statusCode: 404 };
            }
            return { message: "Partner updated successfully", data: updatedPartner, statusCode: 200 };
        });
    }

    static async deletePartner(req) {
        const { id } = req.params;
        return await this.handleOperation(async () => {
            const numDeleted = await Partners.query().deleteById(id);
            if (numDeleted === 0) {
                return { message: "Partner not found", data: null, statusCode: 404 };
            }
            return { message: "Partner deleted successfully", data: null, statusCode: 200 };
        });
    }

    static async handleOperation(operation) {
        try {
            return await operation();
        } catch (error) {
            console.error("Error:", error);
            const statusCode = error.statusCode || 500;
            return { message: "Internal server error", data: null, statusCode };
        }
    }
}

module.exports = PartnersController;
