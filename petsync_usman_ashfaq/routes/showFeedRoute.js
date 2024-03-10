const express = require('express');
const router = express.Router();
const Controller = require('../controller/socialmedia/showFeedController');
const showFeedController = new Controller();

router.get('/showfeed/:id',(req,res)=>{
    showFeedController.displayFeed(req,res);
    
});

router.post('/profile/postFeed/:id/likeImage/:likeflag',(req,res)=>{
    showFeedController.likeFeed(req,res); 
});




module.exports = router;
