const express = require('express');
const PartnersController = require('../controller/partnerController');
const router = express.Router();

router.post('/partner', (req, res) => PartnersController.createPartner(req, res));
router.get('/partners', (req, res) => PartnersController.getAllPartners(req, res));
router.get('/partners/:id', (req, res) => PartnersController.getPartnerById(req, res));
router.put('/partners/:id', (req, res) => PartnersController.updatePartner(req, res));
router.delete('/partners/:id', (req, res) => PartnersController.deletePartner(req, res));

module.exports = router;
