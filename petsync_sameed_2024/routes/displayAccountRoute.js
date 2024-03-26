const express = require('express');
const router = express.Router();
const displayAccountController = require('../controller/socialmedia/displayAccountController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/account/:username',authMiddleware.isAuthenticated, displayAccountController.displayAccount);
// here : is used to access vlaue then using req.params.username
router.post('/follow',(req,res)=>
{

    displayAccountController.followUser(req,res);
});



//Query parameters are passed as part of the URL query string and accessed through req.query.
//Route parameters are part of the URL path itself and are accessed through req.params.


module.exports = router;