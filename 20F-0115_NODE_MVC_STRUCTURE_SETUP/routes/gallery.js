const express = require('express');
const router = express.Router();

const GalleryController1 = require('../controller/galleryController');

const GalleryController = new GalleryController1();

router.get('/gallery',(req,res)=>{
    GalleryController.displayPage(req,res);
});




module.exports = router;
