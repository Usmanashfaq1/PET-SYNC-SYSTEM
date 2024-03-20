let cart_list = [];
document.addEventListener('DOMContentLoaded', function () {
    cart_list = [-1];
    all_products();
    email_e = localStorage.getItem('email_e');
    countOfItemsInWishList();
    countOfItemsInCart();

});

function all_products() {
    $.ajax({
        url: 'http://localhost:3001/get_products',
        method: 'GET',
        success: function (data) {
            // Clear existing product items
            $('.row.gutter-20.row-cols-1.row-cols-xl-5.row-cols-lg-4.row-cols-md-3.row-cols-sm-2.justify-content-center').empty();

            if (data && data.length > 0) {
                data.forEach(function (result) {
                    // Ensure the rating is between 1 and 5
                    var rating = Math.min(5, Math.max(1, result.rating));

                    // Generate star icons based on the rating
                    var starIcons = '';
                    for (var i = 0; i < 5; i++) {
                        if (i < rating) {
                            // Display yellow star for the rated part
                            starIcons += '<i class="fas fa-star"></i>';
                        } else {
                            // Display empty star for the unrated part
                            starIcons += '<i class="far fa-star"></i>';
                        }
                    }

                    // Generate the product item HTML
                    var productItem = `
                    <div class="col-md-4 col-lg-3 col-xl-2 product-item" style="margin-bottom: 20px;">
                        <div class="product__item" style="border: 1px solid #ddd; border-radius: 5px; overflow: hidden; height: 100%;">
                            <div class="product__thumb" style="height: 200px; position: relative;">
                                <img src="data:image/jpeg;base64,${result.productPicture}" alt="Product Image" style="width: 100%; height: 100%; object-fit: cover;">
                                <div class="product__action" style="position: absolute; top: 15px; right: 15px;">

                                
                        
                                    <a  style=""><i class="fa fa-heart-o fa-1x" style="font-size:25px;margin-bottom: 25px;" id="wishlistIcon" onclick="addTowishlist(${result.p_id})">&#x2764;&#xFE0F;</i>
                                    </a>
                                    <a onclick="open_details(${result.p_id})" style="margin-right: 5px;"><i class="flaticon-loupe"></i></a>
                                </div>
                                <div class="sale-wrap" style="background-color: #ff0000; color: #fff; padding: 5px; position: absolute; top: 0; left: 0;">
                                    <span>New</span>
                                </div>
                                <div class="product__add-cart" style="margin-top: 15px; text-align: center;">
                                    <button class="btn" onclick="addToCart(${result.p_id},${result.price} )" style="background-color:  #800080; color: #fff; border: none; border-radius: 5px; padding: 8px 15px;">
                                        <i class="flaticon-shopping-bag"></i> Add To Cart
                                    </button>
                                </div>
                            </div>
                            <div class="product__content" style="padding: 15px;">
                                <div class="product__reviews" style="margin-bottom: 10px;">
                                    <div class="rating" style="color: #ffc107;">
                                        ${starIcons}
                                    </div>
                                   
                                </div>
                                <h4 class="title" style="font-size: 16px; margin-bottom: 5px;">
                                    <a href="#" style="color: #333; text-decoration: none;">${result.product_name}</a>
                                </h4>
                                <h3 class="price" style="font-size: 18px; font-weight: bold; color: #333;">
                                    $${result.price}
                                </h3>
                                <span>(0 Reviews)</span>
                            </div>
                        </div>
                    </div>
                    `;

                    // Append the dynamically generated product item to the container
                    $('.row.gutter-20.row-cols-1.row-cols-xl-5.row-cols-lg-4.row-cols-md-3.row-cols-sm-2.justify-content-center').append(productItem);
                });
            } else {
                // No product items found
                $('.row.gutter-20.row-cols-1.row-cols-xl-5.row-cols-lg-4.row-cols-md-3.row-cols-sm-2.justify-content-center').append('<div class="col-md-12">No product items found</div>');
            }
        }

        ,
        error: function (error) {
            console.error('Error fetching product details:', error);
            alert(error);
            $('#tab-1 .row').empty();
        }
    });
}

function selectCategory(value) {
    if (value == 'All') {
        all_products();
    }
    else {
        $.ajax({
            url: 'http://localhost:3001/get_specific_product/' + value,
            method: 'GET',
            success: function (data) {
                // Clear existing product items
                $('.row.gutter-20.row-cols-1.row-cols-xl-5.row-cols-lg-4.row-cols-md-3.row-cols-sm-2.justify-content-center').empty();

                if (data && data.length > 0) {
                    data.forEach(function (result) {
                        // Ensure the rating is between 1 and 5
                        var rating = Math.min(5, Math.max(1, result.rating));

                        // Generate star icons based on the rating
                        var starIcons = '';
                        for (var i = 0; i < 5; i++) {
                            if (i < rating) {
                                // Display yellow star for the rated part
                                starIcons += '<i class="fas fa-star"></i>';
                            } else {
                                // Display empty star for the unrated part
                                starIcons += '<i class="far fa-star"></i>';
                            }
                        }

                        // Generate the product item HTML
                        var productItem = `
                        <div class="col-md-4 col-lg-3 col-xl-2 product-item" style="margin-bottom: 20px;">
                            <div class="product__item" style="border: 1px solid #ddd; border-radius: 5px; overflow: hidden; height: 100%;">
                                <div class="product__thumb" style="height: 200px; position: relative;">
                                    <img src="data:image/jpeg;base64,${result.productPicture}" alt="Product Image" style="width: 100%; height: 100%; object-fit: cover;">
                                    <div class="product__action" style="position: absolute; top: 15px; right: 15px;">
                                        <a  style="margin-right: 5px;"><i class="fa fa-heart" style="font-size:24px;" id="wishlistIcon" onclick="addTowishlist(${result.p_id})"></i>
                                        </a>
                                        <a onclick="open_details(${result.p_id})" style="margin-right: 5px;"><i class="flaticon-loupe"></i></a>
                                    </div>
                                    <div class="sale-wrap" style="background-color: #ff0000; color: #fff; padding: 5px; position: absolute; top: 0; left: 0;">
                                        <span>New</span>
                                    </div>
                                    <div class="product__add-cart" style="margin-top: 15px; text-align: center;">
                                        <button class="btn" onclick="addToCart(${result.p_id}, ${result.price})" style="background-color: #007bff; color: #fff; border: none; border-radius: 5px; padding: 8px 15px;">
                                            <i class="flaticon-shopping-bag"></i> Add To Cart
                                        </button>
                                    </div>
                                </div>
                                <div class="product__content" style="padding: 15px;">
                                    <div class="product__reviews" style="margin-bottom: 10px;">
                                        <div class="rating" style="color: #ffc107;">
                                            ${starIcons}
                                        </div>
                                       
                                    </div>
                                    <h4 class="title" style="font-size: 16px; margin-bottom: 5px;">
                                        <a href="#" style="color: #333; text-decoration: none;">${result.product_name}</a>
                                    </h4>
                                    <h3 class="price" style="font-size: 18px; font-weight: bold; color: #333;">
                                        $${result.price}
                                    </h3>
                                    <span>(0 Reviews)</span>
                                </div>
                            </div>
                        </div>
                        `;

                        // Append the dynamically generated product item to the container
                        $('.row.gutter-20.row-cols-1.row-cols-xl-5.row-cols-lg-4.row-cols-md-3.row-cols-sm-2.justify-content-center').append(productItem);
                    });
                } else {
                    // No product items found
                    $('.row.gutter-20.row-cols-1.row-cols-xl-5.row-cols-lg-4.row-cols-md-3.row-cols-sm-2.justify-content-center').append('<div class="col-md-12">No product items found</div>');
                }
            },
            error: function (error) {
                console.error('Error fetching product details:', error);
                alert(error);
                $('#tab-1 .row').empty();
            }
        });
    }
}



function addToCart(item_id, price) {
    var email_e = localStorage.getItem('email_e');

    $.ajax({
        url: 'http://localhost:3001/add_to_cart?item_id=' + item_id + '&email_e=' + email_e + '&price=' + price,
        method: 'POST',
        success: function (data) {
            if (data === 1) {
                document.getElementById('message').innerText = 'Item Added to Cart!';
                showDialog_donot_reload();
            } else {
                document.getElementById('message').innerText = 'Item Already Added to Cart!';
                showDialog();
            }
            // Check count of cart from DB
            countOfItemsInCart();
        },
        error: function (error) {
            console.error('Error adding item to cart:', error);
            alert('Error adding item to cart. Please try again.');
        }
    });
}


function countOfItemsInCart() {
    // Check count of cart from DB
    $.ajax({
        url: 'http://localhost:3001/cart_item_number?email_e=' + email_e,
        method: 'GET',
        success: function (data) {
            var cartCount = $('.header-cart-two span');
            var currentCount = parseInt(cartCount.text());
            var newCartCount = (currentCount * 0) + parseInt(data.itemCount);
            cartCount.text(newCartCount);

           
            var totalPrice = data.total;
            if (data.total == null)
            {
                totalPrice = 0.00;
            }
            $('.price_of_total').text('$' + totalPrice.toFixed(2));
        },
        error: function (error) {
            console.error('Error getting cart item number:', error);
            alert('Error getting cart item number. Please try again.');
        }
    });
}




function open_details(id) {
    localStorage.setItem('id_detail_of_item', id);
    window.location.href = "/product-details";
}



function addTowishlist(productId) {

    var email_e = localStorage.getItem('email_e');

    $.ajax({
        url: 'http://localhost:3001/add_to_wishlist?item_id=' + productId + '&email_e=' + email_e,
        method: 'POST',
        success: function (data) {
            if (data === 1) {
                document.getElementById('message').innerText = 'Item Added to wishlist!';
                showDialog_donot_reload();
            } else {
                document.getElementById('message').innerText = 'Item Already Added to wishlist!';
                showDialog();
            }

            // Check count of wishlist from DB
            countOfItemsInWishList();

        },
        error: function (error) {
            console.error('Error adding item to cart:', error);
            alert('Error adding item to cart. Please try again.');
        }
    });



}


function countOfItemsInWishList() {
    $.ajax({
        url: 'http://localhost:3001/wishlist_item_number?email_e=' + email_e,
        method: 'GET',
        success: function (data) {
            var cartCount = $('.header-wishlist-two span');
            var currentCount = parseInt(cartCount.text());
            var newCartCount = (currentCount * 0) + parseInt(data.total);
            cartCount.text(newCartCount);

        },
        error: function (error) {
            console.error('Error getting cart item number:', error);
            alert('Error getting cart item number. Please try again.');
        }
    });
}





function itemcartpage() {
    var email_e = localStorage.getItem('email_e');
    var name = localStorage.getItem('name');

    var itemCartLink = document.getElementById('itemCartLink');
    if (itemCartLink) {
        itemCartLink.href = '/item_cart?email_e=' + email_e + '&name=' + name;
    } else {
        console.error("Element with id 'itemCartLink' not found.");
    }
}



function wishlistpage() {

    var wishlist = document.getElementById('wishlist');
    if (itemCartLink) {
        wishlist.href = '/wishlist'
    } else {
        console.error("Element with id 'itemCartLink' not found.");
    }
}
