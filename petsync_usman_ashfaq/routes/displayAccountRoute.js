const express = require('express');
const router = express.Router();
const displayAccountController = require('../controller/socialmedia/displayAccountController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/account/:username',authMiddleware.isAuthenticated, displayAccountController.displayAccount);

router.post('/follow',(req,res)=>
{

    displayAccountController.followUser(req,res);
});



module.exports = router;