const express = require('express');
const router = express.Router();
const displayAccountController = require('../controller/displayAccountController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/account/:username',authMiddleware.isAuthenticated, displayAccountController.displayAccount);



module.exports = router;
