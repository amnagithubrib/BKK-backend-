const express = require("express");
const router = express.Router();
const FormController = require("../controller/formController");
const { Authenticated } = require("../middleware/registerauth");
const uploadMiddleware = require("../middleware/uploadMiddleWare")
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads/"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post("/form", Authenticated, upload.single("image"), async function(req, res) {
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
