const express = require('express');
const router = express.Router();
const userController = require('../controller/socialmedia/findUsers');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/users',authMiddleware.isAuthenticated , userController.getAllUsers);

module.exports = router;
