
const express = require('express');
const router = express.Router();
const Controller = require('../controller/createController');
const createController = new Controller();

const multer=require('../middleware/multerSetup');

router.post('/profile/postFeed',multer.single('userFeed'),(req,res)=>{
    createController.uploadFeed(req,res);
});

module.exports = router;