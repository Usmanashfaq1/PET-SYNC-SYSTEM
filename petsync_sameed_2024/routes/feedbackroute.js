const express = require('express');
const router = express.Router();
const submitFeedback = require('../controller/user/feedbackController');
const { isUserAuthenticated } = require('../middleware/authMiddleware');

// Route for submitting feedback
router.post('/api/feedback',isUserAuthenticated, submitFeedback);

router.get('/feedback',isUserAuthenticated, (req, res) => {
    res.render('feedback'); // Assuming you have a feedback.ejs file in your views folder
});

module.exports = router;
