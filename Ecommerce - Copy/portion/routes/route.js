const express = require("express");
const router = express.Router();

const {handle_get_profiles} = require('../controller/products')
const {load_products_page} = require('../controller/products')

 router.get('/get_profiles', handle_get_profiles);

router.get('/e', load_products_page);


module.exports = router;