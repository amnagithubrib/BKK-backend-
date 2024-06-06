const express = require("express");
const zoneController = require("../controller/zoneController");
const { Authenticated } = require("../middleware/registerauth");
const router = express.Router();

router.post("/zones", zoneController.createZone);
router.get("/zones", zoneController.getAllZones);
router.get("/zones/:id", zoneController.getZoneById);
router.get("/zones/:id/location", zoneController.getZoneWithLocations);
router.get("/zones/:id/locations", zoneController.getLocationsByZoneId) // New route for fetching zone with locations
router.put("/zones/:id", Authenticated, zoneController.updateZone);
router.delete("/zones/:id", Authenticated, zoneController.deleteZone);

router.post("/zoness", zoneController.createZoneWithLocations);
router.get("/zoness/:id", zoneController.getZoneWithLocations);

// current code

module.exports = router;
