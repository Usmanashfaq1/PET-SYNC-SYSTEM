
const express = require('express');
const router = express.Router();
const Controller = require('../controller/animal');





router.get('/animal',(req,res)=>{
    Controller.getanimal(req,res);
});



module.exports = router;