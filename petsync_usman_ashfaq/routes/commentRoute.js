const express = require('express');
const router = express.Router();
const ControllerC = require('../controller/socialmedia/commentController');
const ControllerL = require('../controller/socialmedia/postController');

const Controller1 = new ControllerC();
const Controller2 = new ControllerL();

router.get('/showfeed/:id',(req,res)=>{
    Controller1.displayFeed(req,res);
    //res.send(html); 
});

router.post('/profile/postFeed/:id/likeImage/:likeflag',(req,res)=>{
    Controller2.likeFeed(req,res); 
});

router.post('/profile/postFeed/:id/comment',(req,res)=>{
   Controller1.commentFeed(req,res);
}); 


module.exports = router;
