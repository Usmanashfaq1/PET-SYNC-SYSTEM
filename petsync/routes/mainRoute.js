const express = require('express');
const router = express.Router();
const Controller = require('../controller/socialmedia/mainController');
const authMiddleware = require('../middleware/authMiddleware');
const mainController= new Controller();


router.get('/main',authMiddleware.isAuthenticated ,(req,res)=>{  //here using middle ware to check session
    mainController.displayPage(req,res); 
});

module.exports = router;
