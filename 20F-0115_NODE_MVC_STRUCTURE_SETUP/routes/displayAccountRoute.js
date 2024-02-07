const express = require('express');
const router = express.Router();
const displayAccountController = require('../controller/displayAccountController');

router.get('/account/:username', displayAccountController.displayAccount);



module.exports = router;
