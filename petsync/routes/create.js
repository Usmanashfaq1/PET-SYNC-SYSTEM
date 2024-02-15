
const express = require('express');
const router = express.Router();
const Controller = require('../controller/socialmedia/createController');
const createController = new Controller();

const multer=require('../middleware/multerSetup');


router.get('/create',(req,res)=>{
    createController.displayPage(req,res);
});

router.post('/profile/postFeed',multer.single('userFeed'),(req,res)=>{
    createController.uploadFeed(req,res);
});

module.exports = router;