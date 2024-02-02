const express = require("express");
const router = express.Router();

const {handle_get_profiles} = require('../controller/products')
const {load_products_page} = require('../controller/products')
const {load_admin_page} = require('../controller/admin')
const {load_admin_products_page} = require('../controller/admin')

const {handle_add_product} = require('../controller/admin')
const {handle_add_product_middleware} = require('../controller/admin')


router.get('/get_profiles', handle_get_profiles);

router.get('/E-commerce', load_products_page);

router.get('/admin_dashboard', load_admin_page);

router.get('/admin_products', load_admin_products_page);

router.post('/add_product', handle_add_product_middleware, handle_add_product);


module.exports = router;
