const express = require('express');
const router = express.Router();
const Controller = require('../controller/profileController');
const profileController = new Controller();



router.get('/profile',(req,res)=>{
    profileController.displayUserProfile(req,res);
});

module.exports = router;   // this line is very important !!! otherwise it will recognize the route as middleware express!
