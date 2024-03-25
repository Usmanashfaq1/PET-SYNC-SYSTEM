const express = require('express');
const router = express.Router();
const Controller = require('../controller/socialmedia/exploreController');
const authMiddleware = require('../middleware/authMiddleware');
const exploreController= new Controller();


router.get('/explore',authMiddleware.isAuthenticated ,(req,res)=>{  //here using middle ware to check session
    exploreController.displayPage(req,res); 
});

module.exports = router;
