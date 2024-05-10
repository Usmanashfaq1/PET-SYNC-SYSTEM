const express = require('express');
const router = express.Router();
const Controller = require('../controller/socialmedia/userSettingController');
const editProfileController = new Controller();
const authMiddleware = require('../middleware/authMiddleware');

const multer=require('../middleware/multerSetup');

router.get('/edit',authMiddleware.isAuthenticated,(req,res)=>{
    //res.send("Edit Profile");
    editProfileController.displayPage(req,res);

});

//Yet to be done
router.post('/edit',multer.single('profilePic'),authMiddleware.isAuthenticated,(req,res)=>{
    editProfileController.enterInfo(req,res);
   
}); 

module.exports = router;
