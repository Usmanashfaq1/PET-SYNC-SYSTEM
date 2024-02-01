const express = require("express");
const router = express.Router();

const {handle_get_profiles} = require('../controller/products')
const {load_products_page} = require('../controller/products')
const {load_admin_page} = require('../controller/admin')

 router.get('/get_profiles', handle_get_profiles);

router.get('/E-commerce', load_products_page);

router.get('/admin_dashboard', load_admin_page);


module.exports = router;