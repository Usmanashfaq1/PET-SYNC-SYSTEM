const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Logout route
router.get('/logout', authMiddleware.isAuthenticated, authController.logout);

module.exports = router;
