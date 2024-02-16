const express = require('express');
const router = express.Router();
const userController = require('../controller/user/userincontroller');

// Route for displaying the login page
router.get('/login_user', userController.displayPage);

// Route for handling user login
router.post('/login_user', userController.loginUser);

module.exports = router;
