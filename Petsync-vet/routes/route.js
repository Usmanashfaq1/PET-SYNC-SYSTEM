const express = require("express");
const router = express.Router();


const { load_products_page } = require('../controller/products')
const { load_admin_page } = require('../controller/admin')
const { load_admin_products_page } = require('../controller/admin')
const { load_edit_product_page } = require('../controller/edit_products')
const { load_update_product_page } = require('../controller/edit_products')
const { load_open_cart_page } = require('../controller/cart')




const { handle_add_product } = require('../controller/admin')
const { handle_get_products } = require('../controller/products')
const { handle_delete_product } = require('../controller/edit_products')
const { handle_get_specific_product } = require('../controller/edit_products')
const { handle_load_update_product } = require('../controller/edit_products')
const { handle_updated_product_data } = require('../controller/edit_products')
const { handle_add_to_cart } = require('../controller/cart')
const { handle_cart_item_number } = require('../controller/cart')
const { handle_get_cart_items } = require('../controller/cart')
const { handle_remove_from_cart } = require('../controller/cart')




router.get('/update_product', load_update_product_page);

router.get('/open_cart_page', load_open_cart_page);


router.get('/get_products', handle_get_products);

router.get('/get_specific_product/:category', handle_get_specific_product);

router.get('/E-commerce', load_products_page);

router.get('/admin_dashboard', load_admin_page);

router.get('/admin_products', load_admin_products_page);

router.post('/add_product', handle_add_product);

router.get('/edit_product', load_edit_product_page);

router.delete('/delete_product/:id', handle_delete_product);

router.get('/load_update_product/:id', handle_load_update_product);

router.post('/updated_product_data', handle_updated_product_data);

router.post('/add_to_cart', handle_add_to_cart);

router.get('/cart_item_number', handle_cart_item_number);

router.get('/get_cart_items', handle_get_cart_items);

router.delete('/remove_from_cart/:id', handle_remove_from_cart);


module.exports = router;
