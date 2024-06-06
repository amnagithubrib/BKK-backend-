const express = require("express");
const RegistrationsController = require("../controller/registrationsController");
const { Authenticated } = require("../middleware/registerauth");
const { validateSignup, validateLogin } = require("../middleware/registrationsValidation");
const router = express.Router();

router.post("/Registrations", validateSignup, (req, res) => {
    RegistrationsController.signup(req, res);
});

router.post("/loginRegistrations", validateLogin, (req, res) => {
    RegistrationsController.login(req, res);
});

router.get("/testRegistrations", Authenticated, (req, res) => {
    RegistrationsController.testRoute(req, res);
});

module.exports = router;
