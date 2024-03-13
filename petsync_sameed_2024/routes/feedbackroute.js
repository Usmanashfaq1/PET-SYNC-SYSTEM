const express = require('express');
const router = express.Router();
const submitFeedback = require('../controller/user/feedbackController');

// Route for submitting feedback
router.post('/', submitFeedback);

module.exports = router;
