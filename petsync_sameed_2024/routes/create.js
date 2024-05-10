
const express = require('express');
const router = express.Router();
const Controller = require('../controller/socialmedia/createController');
const createController = new Controller();
const authMiddleware = require('../middleware/authMiddleware');

const multer=require('../middleware/multerSetup');


router.get('/create',authMiddleware.isAuthenticated,(req,res)=>{
    createController.displayPage(req,res);
});

router.post('/profile/postFeed',multer.single('userFeed'),authMiddleware.isAuthenticated,(req,res)=>{
    createController.uploadFeed(req,res);
});

module.exports = router;