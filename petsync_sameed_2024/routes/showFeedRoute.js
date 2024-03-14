const express = require('express');
const router = express.Router();
const Controller = require('../controller/socialmedia/postController');
const showFeedController = new Controller();



router.post('/profile/postFeed/:id/likeImage/:likeflag',(req,res)=>{
    showFeedController.likeFeed(req,res); 
});

router.post('/profile/postFeed/:id/comment',(req,res)=>{
    showFeedController.commentFeed(req,res);
}); 


module.exports = router;
