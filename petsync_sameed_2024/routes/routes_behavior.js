const express = require('express');
const router = express.Router();
const behaviorController = require('../controller/user/BehaviorController');
const { isUserAuthenticated } = require('../middleware/authMiddleware');
// Route to display the behavior recording page
router.get('/feedrbt', isUserAuthenticated, behaviorController.displayPage);

// Route to handle the form submission for recording behavior
router.post('/record_behavior', behaviorController.recordBehavior);

router.get('/feedrbt_view', isUserAuthenticated, behaviorController.displayPage_records);



// Route to display the behavior editing page
router.get('/edit_behavior', isUserAuthenticated, behaviorController.displayEditPage);

// Route to handle behavior update
router.post('/update_behavior', isUserAuthenticated, behaviorController.updateBehavior);

// Route to handle behavior deletion
router.post('/delete_behavior', isUserAuthenticated, behaviorController.deleteBehavior);
module.exports = router;
