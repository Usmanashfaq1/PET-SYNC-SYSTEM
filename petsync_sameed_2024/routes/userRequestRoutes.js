const express = require('express');
const router = express.Router();
const UserRequestController = require('../controller/socialmedia/userRequestController');
const { isUserAuthenticated } = require('../middleware/authMiddleware');
// Route to fetch all user requests
router.get('/requests', UserRequestController.getAllRequests);

// Route to create a new user request
router.post('/requests', UserRequestController.createRequest);


router.get('/rs',(req,res)=>{
    res.render('create_request');
});


module.exports = router;
