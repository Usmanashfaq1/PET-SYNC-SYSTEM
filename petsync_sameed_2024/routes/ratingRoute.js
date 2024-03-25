const express = require('express');
const router = express.Router();
const vetController = require('../controller/user/ratingController');

// Route to fetch all vets and render viewVets EJS file
router.get('/vets', vetController.getAllVets);

module.exports = router;
