// // const express = require('express');
// // const userController = require('../controller/userController');
// // const { isAuthenticated } = require('../middleware/auth');
// // const { validateSignup, validateLogin } = require('../middleware/userValidation');
// // const router = express.Router();
// // router.post('/signup', validateSignup, userController.signup);
// // router.post('/login', validateLogin, userController.login);
// // router.get('/test', isAuthenticated, userController.testRoute);

// // router.get('/getAllUsers', async (req, res) => {
// //     try {
// //         const users = await User.query();
// //         if (users.length === 0) {
// //             return res.status(404).json({ error: "No users found" });
// //         }
// //         const safeUsers = users.map(user => ({
// //             id: user.id,
// //             name: user.name,
// //             email: user.email
// //         }));
// //         res.json(safeUsers);
// //     } catch (err) {
// //         res.status(500).json({ error: 'Internal server error', details: err.message });
// //     }
// // });

// // module.exports = router;

// const express = require('express');
// const userController = require('../controller/userController');
// const { isAuthenticated } = require('../middleware/auth');
// const { validateSignup, validateLogin } = require('../middleware/userValidation');
// const router = express.Router();

// router.post('/signup', validateSignup, (req, res) => {
//     userController.signup(req, res);
// });

// router.post('/login', validateLogin, (req, res) => {
//     userController.login(req, res);
// });

// router.get('/test', isAuthenticated, (req, res) => {
//     userController.testRoute(req, res);
// });

// module.exports = router;

// routes/userRoutes.js
const express = require("express");
const userController = require("../controller/userController");
const { isAuthenticated } = require("../middleware/auth");
const { validateSignup, validateLogin } = require("../middleware/userValidation");
const router = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User signup
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: number
 *                 example: 1234567890
 *               pin:
 *                 type: integer
 *                 example: "1234"
 *     responses:
 *       201:
 *         description: Signup successful
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict - number already in use
 */
router.post("/signup", validateSignup, userController.signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: number
 *                 example: 1234567890
 *               pin:
 *                 type: integer
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: number and pin are required
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", validateLogin, userController.login);

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test route
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Access granted to secret route
 *       500:
 *         description: Internal server error
 */
router.get("/test", isAuthenticated, userController.testRoute);

module.exports = router;
