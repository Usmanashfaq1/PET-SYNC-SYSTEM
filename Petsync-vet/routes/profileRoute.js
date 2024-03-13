const express = require('express');
const router = express.Router();
const Controller = require('../controller/socialmedia/profileController');
const profileController = new Controller();

const multer=require('../middleware/multerSetup');

router.get('/profile',(req,res)=>{
    profileController.displayPage(req,res);
});


module.exports = router;