const express = require("express");
const router = express.Router();
const { isUserAuthenticated } = require('../middleware/authMiddleware');


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

const { handle_get_orders_for_sales } = require('../controller/E-commerce/order')


const { do_update_status } = require('../controller/E-commerce/order')








router.post('/update_status',isUserAuthenticated, do_update_status);


router.get('/update_product',isUserAuthenticated, load_update_product_page);

router.get('/get_products',isUserAuthenticated, handle_get_products);

router.get('/get_specific_product/:category',isUserAuthenticated, handle_get_specific_product);

router.get('/admin_dashboard1',isUserAuthenticated, load_admin_page);

router.get('/admin_products',isUserAuthenticated, load_admin_products_page);

router.post('/add_product', isUserAuthenticated,handle_add_product);

router.get('/edit_product', isUserAuthenticated,load_edit_product_page);

router.delete('/delete_product/:id', isUserAuthenticated,handle_delete_product);

router.get('/load_update_product/:id',isUserAuthenticated, handle_load_update_product);

router.get('/order',isUserAuthenticated, load_order_page);

router.get('/get_orders',isUserAuthenticated, handle_get_orders);

router.get('/get_orders_for_sales',isUserAuthenticated, handle_get_orders_for_sales);


router.post('/updated_product_data',isUserAuthenticated, handle_updated_product_data);




module.exports = router;
