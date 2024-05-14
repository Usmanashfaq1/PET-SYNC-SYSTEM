const express = require("express");
const router = express.Router();
const { isEcommerceAuthenticated } = require('../middleware/authMiddleware');
const controller = require('./../controller/encryption/playfair');
const controllerF = require('./../controller/user/feedbackController');
// just this added new//
const authMiddleware = require('../middleware/authMiddleware');

const { load_products_page } = require('../controller/E-commerce/products')
const { load_admin_page } = require('../controller/E-commerce/admin')
const { load_admin_products_page } = require('../controller/E-commerce/admin')
const { load_edit_product_page } = require('../controller/E-commerce/edit_products')
const { load_update_product_page } = require('../controller/E-commerce/edit_products')
const { load_open_cart_page } = require('../controller/E-commerce/cart')
const { Load_shop_page } = require('../controller/E-commerce/products')
const { load_wishlist_page } = require('../controller/E-commerce/wishlist')
const { load_order_tracking_page } = require('../controller/E-commerce/order')





//payment
const {payment} = require('../controller/E-commerce/paymentController');
const {failure} = require('../controller/E-commerce/paymentController');




const { handle_add_product } = require('../controller/E-commerce/admin')
const { load_order_placed_page} = require('../controller/E-commerce/admin')


const { handle_get_products } = require('../controller/E-commerce/products')
const { handle_delete_product } = require('../controller/E-commerce/edit_products')
const { handle_get_specific_product } = require('../controller/E-commerce/edit_products')
const { handle_load_update_product } = require('../controller/E-commerce/edit_products')
const { handle_updated_product_data } = require('../controller/E-commerce/edit_products')
const { handle_add_to_cart } = require('../controller/E-commerce/cart')
const { handle_add_to_wishlist } = require('../controller/E-commerce/wishlist')
const { handle_cart_item_number } = require('../controller/E-commerce/cart')

 const { handle_wishlist_item_number } = require('../controller/E-commerce/wishlist')


const { handle_get_cart_items } = require('../controller/E-commerce/cart')
const { handle_get_wishlist_items } = require('../controller/E-commerce/wishlist')



const { handle_remove_from_cart } = require('../controller/E-commerce/cart')
const { handle_remove_from_wishlist } = require('../controller/E-commerce/wishlist')


const { handle_E_commerce_login } = require('../controller/E-commerce/E-commerce_login')
const { handle_get_product_detail_with_id } = require('../controller/E-commerce/product_detail')
const { handle_cart_item_number_quantity } = require('../controller/E-commerce/cart')
const { handle_cart_item_number_quantity_delete } = require('../controller/E-commerce/cart')


const { handle_check_added_to_cart } = require('../controller/E-commerce/cart')
const { handle_and_load_item_cart } = require('../controller/E-commerce/cart')

const { handle_order_details } = require('../controller/E-commerce/admin')
const { handle_get_order } = require('../controller/E-commerce/order')

const { handle_get_track } = require('../controller/E-commerce/track')

const { handle_send_review } = require('../controller/E-commerce/review')
const { handle_get_reviews } = require('../controller/E-commerce/review')
const { handle_delete_review } = require('../controller/E-commerce/review')




router.get('/update_product',isEcommerceAuthenticated, load_update_product_page);

router.get('/open_cart_page', isEcommerceAuthenticated , load_open_cart_page);

router.get('/get_products', isEcommerceAuthenticated ,handle_get_products);

router.get('/get_specific_product/:category',isEcommerceAuthenticated , handle_get_specific_product);

router.get('/E-commerce', isEcommerceAuthenticated , load_products_page);

router.get('/admin_dashboard', isEcommerceAuthenticated, load_admin_page);



router.get('/admin_products', isEcommerceAuthenticated , load_admin_products_page);

router.post('/add_product', isEcommerceAuthenticated , handle_add_product);

router.get('/edit_product', isEcommerceAuthenticated , load_edit_product_page);

router.delete('/delete_product/:id', isEcommerceAuthenticated , handle_delete_product);

router.get('/load_update_product/:id', isEcommerceAuthenticated , handle_load_update_product);

router.post('/updated_product_data', isEcommerceAuthenticated , handle_updated_product_data);

router.post('/add_to_cart', isEcommerceAuthenticated, handle_add_to_cart);

router.post('/add_to_wishlist', isEcommerceAuthenticated, handle_add_to_wishlist);


router.get('/cart_item_number', isEcommerceAuthenticated , handle_cart_item_number);


 router.get('/wishlist_item_number', isEcommerceAuthenticated , handle_wishlist_item_number);


router.get('/get_cart_items', isEcommerceAuthenticated , handle_get_cart_items);

router.get('/get_wishlist_items', isEcommerceAuthenticated , handle_get_wishlist_items);


router.delete('/remove_from_cart/:id', isEcommerceAuthenticated , handle_remove_from_cart);

router.delete('/remove_from_wishlist/:id', isEcommerceAuthenticated , handle_remove_from_wishlist);


router.get('/Load_shop_page', isEcommerceAuthenticated ,Load_shop_page);

router.post('/login_E', handle_E_commerce_login);

router.get('/get_product_detail_with_id',isEcommerceAuthenticated, handle_get_product_detail_with_id);

router.get('/cart_item_number_quantity', isEcommerceAuthenticated , handle_cart_item_number_quantity);

router.get('/cart_item_number_quantity_delete', isEcommerceAuthenticated , handle_cart_item_number_quantity_delete);



router.get ('/check_added_to_cart', isEcommerceAuthenticated , handle_check_added_to_cart);


router.get('/item_cart', isEcommerceAuthenticated , handle_and_load_item_cart);

router.get('/order_details',isEcommerceAuthenticated , handle_order_details);

router.get('/get_orders',isEcommerceAuthenticated , handle_get_order);

router.get('/get_track',isEcommerceAuthenticated , handle_get_track);


router.get('/wishlist', isEcommerceAuthenticated , load_wishlist_page);

router.get('/order_placed', isEcommerceAuthenticated , load_order_placed_page);



router.get('/track', isEcommerceAuthenticated , load_order_tracking_page);

router.post('/sendReview', isEcommerceAuthenticated, handle_send_review);

router.post('/deleteReview', isEcommerceAuthenticated, handle_delete_review);



router.get('/getReviews', isEcommerceAuthenticated , handle_get_reviews);



router.post('/payment', isEcommerceAuthenticated , payment);
router.get('/failure', isEcommerceAuthenticated , failure);

//single routes

router.get('/error', (req, res) => {
    res.render('error');
});

router.get('/community', (req, res) => {
    res.render('community');
});

// dummy views
router.get('/pc', (req, res) => {
    res.render('signup_new');
});

router.get('/cp', (req, res) => {
    res.render('settingnew');
});




// router.get('/payment', (req, res) => {
//     res.render('payment');
// });


// Route for submitting feedback
// this added new 
router.get('/error_community',authMiddleware.isAuthenticated , (req, res) => {
    res.render('error_community');
});



// // Route for decryption
// router.post('/decrypt', controller.decrypt);

module.exports = router;
