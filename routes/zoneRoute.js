
const express = require('express');
const ZoneController = require('../controller/ZoneController');  // Ensure this path is correct
const router = express.Router();

router.post('/zone', (req, res) => ZoneController.createZone(req, res));
router.get('/zones', (req, res) => ZoneController.getAllZones(req, res));
router.get('/zones/:id', (req, res) => ZoneController.getZoneById(req, res));
router.put('/zones/:id', (req, res) => ZoneController.updateZone(req, res));
router.delete('/zones/:id', (req, res) => ZoneController.deleteZone(req, res));

module.exports = router;
