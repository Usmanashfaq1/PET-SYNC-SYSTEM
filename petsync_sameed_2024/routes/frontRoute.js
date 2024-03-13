const express = require('express');
const router = express.Router();
const Controller = require('../controller/front');





router.get('/',(req,res)=>{
   Controller.show(req,res);
});



module.exports = router;