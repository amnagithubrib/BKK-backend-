// const express = require('express');
// const userController = require('../controller/userController');
// const { isAuthenticated } = require('../middleware/auth');
// const { validateSignup, validateLogin } = require('../middleware/userValidation');
// const router = express.Router();
// router.post('/signup', validateSignup, userController.signup);
// router.post('/login', validateLogin, userController.login);
// router.get('/test', isAuthenticated, userController.testRoute);

// router.get('/getAllUsers', async (req, res) => {
//     try {
//         const users = await User.query();
//         if (users.length === 0) {
//             return res.status(404).json({ error: "No users found" });
//         }
//         const safeUsers = users.map(user => ({
//             id: user.id,
//             name: user.name,
//             email: user.email
//         }));
//         res.json(safeUsers);
//     } catch (err) {
//         res.status(500).json({ error: 'Internal server error', details: err.message });
//     }
// });

// module.exports = router;






const express = require('express');
const userController = require('../controller/userController');
const { isAuthenticated } = require('../middleware/auth');
const { validateSignup, validateLogin } = require('../middleware/userValidation');
const router = express.Router();

router.post('/signup', validateSignup, (req, res) => {
    userController.signup(req, res);
});

router.post('/login', validateLogin, (req, res) => {
    userController.login(req, res);
});

router.get('/test', isAuthenticated, (req, res) => {
    userController.testRoute(req, res);
});

module.exports = router;
