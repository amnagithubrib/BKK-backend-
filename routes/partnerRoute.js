const express = require("express");
const PartnersController = require("../controller/partnerController");
const { Authenticated } = require("../middleware/registerauth");

const router = express.Router();

router.get("/partners", Authenticated, async (req, res) => {
    const result = await PartnersController.getAllPartners();
    res.status(result.statusCode).json(result);
});
router.post("/CreatePartners", Authenticated, PartnersController.createPartner);// yhan par
router.post("/logoutPartner", PartnersController.logoutPartner);
router.post("/registerPartners", PartnersController.registerPartner);
router.post("/loginPartners", PartnersController.loginPartner);
router.post("/login", PartnersController.loginPartner);
router.get("/partners/:id", Authenticated, async (req, res) => {
    const result = await PartnersController.getPartnerById(req);
    res.status(result.statusCode).json(result);
});

module.exports = router;
