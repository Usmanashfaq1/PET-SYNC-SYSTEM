const express = require('express');
const router = express.Router();
const Controller = require('../controller/profileController');
const authMiddleware = require('../middleware/authMiddleware');
const profileController = new Controller();



router.get('/profile',authMiddleware.isAuthenticated,(req,res)=>{
    profileController.displayUserProfile(req,res);
});

module.exports = router;   // this line is very important !!! otherwise it will recognize the route as middleware express!
 // added auth guards in all routes including mainRoute, profile and find users route!