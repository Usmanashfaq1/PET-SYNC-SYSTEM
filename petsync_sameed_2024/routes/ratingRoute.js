const express = require('express');
const router = express.Router();
const vetController = require('../controller/user/ratingController');
// Route using http to fetch all vets and render viewVets EJS file,/vets appended to base url of server
router.get('/vets', vetController.getAllVets);
//available to be used in other parts
module.exports = router;
