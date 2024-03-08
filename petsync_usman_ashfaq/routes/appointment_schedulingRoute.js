const express = require('express');
const router = express.Router();

const { isUserAuthenticated } = require('../middleware/authMiddleware');



router.get('/appointment_scheduling',isUserAuthenticated,(req,res)=>{
    res.render('appointment_scheduling');
});

module.exports = router;