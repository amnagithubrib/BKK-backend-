const express = require("express");
const zoneController = require("../controller/zoneController");
const { Authenticated } = require("../middleware/registerauth");
const router = express.Router();

router.post("/zones", zoneController.createZone);
router.get("/zones", zoneController.getAllZones);
router.get("/zones/:id", zoneController.getZoneById);
router.get("/zones/:id/locations", zoneController.getLocationsByZoneId);
router.put("/zones/:id", Authenticated, zoneController.updateZone);
router.post("/zoness", zoneController.createZoneWithLocations);
module.exports = router;
