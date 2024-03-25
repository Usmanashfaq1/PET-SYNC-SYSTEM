const express = require('express');
const router = express.Router();
const UserRequestController = require('../controller/socialmedia/userRequestController');
const { isUserAuthenticated } = require('../middleware/authMiddleware');
// Route to fetch all user requests
router.get('/requests',isUserAuthenticated, UserRequestController.getAllRequests);

// Route to delete a user request
router.post('/requests/delete', isUserAuthenticated, UserRequestController.deleteRequest);


module.exports = router;
