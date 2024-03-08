const express = require('express');
const router = express.Router();
const userController = require('../controller/user/userincontroller');
const { isUserAuthenticated } = require('../middleware/authMiddleware');

// Route for displaying the login page
router.get('/login_user', userController.displayPage);

// Route for handling user login
router.post('/login_user', userController.loginUser);


router.get('/vet_dashboard',isUserAuthenticated,(req,res)=>{
    res.render('vet_dashboard');
});

router.get('/manage_appointment',isUserAuthenticated,(req,res)=>{
    res.render('manage_appointment');
});

module.exports = router;
