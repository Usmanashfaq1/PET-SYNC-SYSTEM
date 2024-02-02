const express = require("express");
const router = express.Router();


const {load_products_page} = require('../controller/products')
const {load_admin_page} = require('../controller/admin')
const {load_admin_products_page} = require('../controller/admin')
const {load_edit_product_page} = require('../controller/edit_products')



const {handle_add_product} = require('../controller/admin')
const {handle_get_products} = require('../controller/products')
 const {handle_delete_product} = require('../controller/edit_products')


router.get('/get_products', handle_get_products);

router.get('/E-commerce', load_products_page);

router.get('/admin_dashboard', load_admin_page);

router.get('/admin_products', load_admin_products_page);

router.post('/add_product', handle_add_product);

router.get('/edit_product', load_edit_product_page);

router.delete('/delete_product/:id', handle_delete_product);


module.exports = router;
