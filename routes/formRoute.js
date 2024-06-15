const express = require("express");
const router = express.Router();
const FormController = require("../controller/formController");
const { Authenticated } = require("../middleware/registerauth");
router.post("/form", Authenticated, async function(req, res) {
    try {
        const result = await FormController.createFormElement(req);
        res.statusCode = 201;
        res.send(result);
    } catch (error) {
        res.statusCode = error.statusCode || 500;
        res.send({ success: false, message: error.message || "Internal Server Error" });
    }
});
router.get("/form/:id", async function(req, res) {
    const result = await FormController.getFormElement(req);
    res.statusCode = 200;
    res.send(result);
});

router.get("/allforms", async function(req, res) {
    const result = await FormController.getAllFormElements(req);
    res.statusCode = 200;
    res.send(result);
});

module.exports = router;
