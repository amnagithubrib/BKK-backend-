const express = require("express");
const PartnersController = require("../controller/partnerController");
const { Authenticated } = require("../middleware/registerauth");
const router = express.Router();

router.post("/partner", Authenticated, async (req, res) => {
    const result = await PartnersController.createPartner(req);
    res.status(result.statusCode).json(result);
});

router.get("/partners", Authenticated, async (req, res) => {
    const result = await PartnersController.getAllPartners();
    res.status(result.statusCode).json(result);
});

router.get("/partners/:id", Authenticated, async (req, res) => {
    const result = await PartnersController.getPartnerById(req);
    res.status(result.statusCode).json(result);
});

router.put("/partners/:id", Authenticated, async (req, res) => {
    const result = await PartnersController.updatePartner(req);
    res.status(result.statusCode).json(result);
});

router.delete("/partners/:id", Authenticated, async (req, res) => {
    const result = await PartnersController.deletePartner(req);
    res.status(result.statusCode).json(result);
});

module.exports = router;
