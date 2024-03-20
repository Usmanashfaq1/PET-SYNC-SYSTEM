const express = require('express');
const router = express.Router();
const behaviorController = require('../controller/user/BehaviorController');
const { isUserAuthenticated } = require('../middleware/authMiddleware');
// Route to display the behavior recording page
router.get('/feedrbt', isUserAuthenticated, behaviorController.displayPage);

// Route to handle the form submission for recording behavior
router.post('/record_behavior', behaviorController.recordBehavior);

router.get('/feedrbt_view', isUserAuthenticated, behaviorController.displayPage_records);
module.exports = router;
