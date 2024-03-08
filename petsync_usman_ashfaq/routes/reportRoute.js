// routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/socialmedia/reportController');

// Route for reporting a user
router.post('/report/user/:userId', userController.reportUser);

module.exports = router;
