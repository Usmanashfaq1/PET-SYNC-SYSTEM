const express = require("express");
const router = express.Router();


const { load_admin_page } = require('../controller/E-commerce/admin')
const { load_admin_products_page } = require('../controller/E-commerce/admin')
const { load_edit_product_page } = require('../controller/E-commerce/edit_products')
const { load_update_product_page } = require('../controller/E-commerce/edit_products')
const { load_order_page } = require('../controller/E-commerce/order')






const { handle_add_product } = require('../controller/E-commerce/admin')
const { handle_get_products } = require('../controller/E-commerce/products')
const { handle_delete_product } = require('../controller/E-commerce/edit_products')
const { handle_get_specific_product } = require('../controller/E-commerce/edit_products')
const { handle_load_update_product } = require('../controller/E-commerce/edit_products')
const { handle_updated_product_data } = require('../controller/E-commerce/edit_products')
const { handle_get_orders } = require('../controller/E-commerce/order')





router.get('/update_product', load_update_product_page);

router.get('/get_products', handle_get_products);

router.get('/get_specific_product/:category', handle_get_specific_product);

router.get('/admin_dashboard1', load_admin_page);

router.get('/admin_products', load_admin_products_page);

router.post('/add_product', handle_add_product);

router.get('/edit_product', load_edit_product_page);

router.delete('/delete_product/:id', handle_delete_product);

router.get('/load_update_product/:id', handle_load_update_product);

router.get('/order', load_order_page);

router.get('/get_orders', handle_get_orders);

router.post('/updated_product_data', handle_updated_product_data);




module.exports = router;
