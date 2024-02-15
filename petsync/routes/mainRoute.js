const express = require('express');
const router = express.Router();
const Controller = require('../controller/mainController');
const authMiddleware = require('../middleware/authMiddleware');
const mainController= new Controller();
router.get('/dfgsg',authMiddleware.isAuthenticated ,(req,res)=>{  //here using middle ware to check session
    mainController.displayPage(req,res); 
});

module.exports = router;
