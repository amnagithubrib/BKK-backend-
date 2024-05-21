const express = require('express');
const LocationController = require('../controller/locationController');
const router = express.Router();

router.post('/location', (req, res) => LocationController.createLocation(req, res));
router.get('/locations', (req, res) => LocationController.getAllLocations(req, res));
router.get('/locations/:id', (req, res) => LocationController.getLocationById(req, res));
router.put('/locations/:id', (req, res) => LocationController.updateLocation(req, res));
router.delete('/locations/:id', (req, res) => LocationController.deleteLocation(req, res));

module.exports = router;
