//function to import modules
const express = require('express');
const router = express.Router();
const submitFeedback = require('../controller/user/feedbackController');
const { isUserAuthenticated } = require('../middleware/authMiddleware');

//route for submitting feedback with authentication middleware
router.post('/api/feedback', isUserAuthenticated, submitFeedback);

//route for rendering feedback page with authentication middleware
router.get('/feedback', isUserAuthenticated, (req, res) => {
    // Rendering feedback.ejs file assuming it's present in the views folder
    res.render('feedback');
});

//export router module for use 
module.exports = router;
