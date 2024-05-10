const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const UserController = require('../controller/socialmedia/displayAccountController');




router.get('/inbox',authMiddleware.isAuthenticated, UserController.inbox);

router.get('/direct-message/:username',authMiddleware.isAuthenticated, UserController.directMessagePage);
router.post('/send-message',authMiddleware.isAuthenticated, UserController.sendMessage);

module.exports = router;
