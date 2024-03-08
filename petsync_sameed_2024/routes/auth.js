const express = require('express');
const router = express.Router();
const authController = require('../controller/socialmedia/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Logout route
router.get('/logout', authMiddleware.isAuthenticated, authController.logout123);


router.get('/logout_user',authMiddleware.isUserAuthenticated,authController.logout);//work

module.exports = router;
