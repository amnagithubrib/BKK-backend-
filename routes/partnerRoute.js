// const express = require("express");
// const PartnersController = require("../controller/partnerController");
// const { Authenticated, Authorized } = require("../middleware/registerauth");

// const router = express.Router();

// router.get("/partners", Authenticated, async (req, res) => {
//     const result = await PartnersController.getAllPartners();
//     res.status(result.statusCode).json(result);
// });
// router.post("/CreatePartners", Authenticated, Authorized("admin"), PartnersController.createPartner);
// router.post("/logoutPartner", PartnersController.logoutPartner);
// router.post("/registerPartners", PartnersController.registerPartner);
// router.post("/loginPartners", PartnersController.loginPartner);
// router.post("/login", PartnersController.loginPartner);
// router.get("/partners/:id", Authenticated, async (req, res) => {
//     const result = await PartnersController.getPartnerById(req);
//     res.status(result.statusCode).json(result);
// });

// module.exports = router;
const express = require("express");
const { Authenticated, Authorized } = require("../middleware/registerauth");
const PartnersController = require("../controller/partnerController");

const router = express.Router();

router.get("/partners", Authenticated, PartnersController.getAllPartners);

router.post("/CreatePartners", Authenticated, Authorized("admin"), PartnersController.createPartner);

router.post("/logoutPartner", PartnersController.logoutPartner);

router.post("/registerPartners", PartnersController.registerPartner);

router.post("/loginPartners", PartnersController.loginPartner);

router.get("/partners/:id", Authenticated, PartnersController.getPartnerById);

module.exports = router;
