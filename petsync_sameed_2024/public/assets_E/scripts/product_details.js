let cart_list = [];
document.addEventListener('DOMContentLoaded', function () {
    cart_list = [-1];
    //all_products();
    email = localStorage.getItem('email');
    //document.getElementById('user').textContent = email;

    $.ajax({
        url: 'http://localhost:3001/cart_item_number?email=' + email,
        method: 'GET',
        success: function (data) {
            var cartCount = $('.header-cart-two span');
            var currentCount = parseInt(cartCount.text());
            var newCartCount = currentCount + parseInt(data.itemCount);
            cartCount.text(newCartCount);

            var totalPrice = data.total;
            $('.price_of_total').text('$' + totalPrice.toFixed(2));
        }
        ,
        error: function (error) {
            console.error('Error adding item to cart:', error);
            alert('Error adding item to cart. Please try again.');
        }
    });

    var id = localStorage.getItem('id_detail_of_item');

    $.ajax({
        url: 'http://localhost:3001/get_product_detail_with_id?id=' + id,
        method: 'GET',
        success: function (data) {
            var container0 = $('.tab-pane.show.active#itemOne-tab-pane');

            var container = $('.product__details-content');

            if (data && data.length > 0) {
                data.forEach(function (result) {
                    // Clear existing content in the container
                    container.empty();

                    // Generate the product reviews HTML
                    var productReviews = `
                    <div class="tag">${result.category}</div>
                    <h2 class="title">${result.product_name}</h2>
                        <div class="product__reviews-wrap">
                            <div class="product__reviews">
                                <div class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                                <span>Rating : (${0} Reviews)</span>
                            </div>
                            <!-- <div class="product__code">
                                <span>SKU: <strong>${result.sku}</strong></span>
                            </div> -->
                        </div>
                    `;

                    // Generate the product price HTML
                    var productPrice = `<h4 class="price">Price : $${result.price}</h4>`;

                    // Generate the product description HTML
                    var productDescription = `<p><strong>Description : </strong>${result.description}</p>`;


                    // Generate the product quantity HTML

                    var productQuantity = `
                    <div class="product__details-qty">
                    <div style="display: flex; align-items: center;">
                        <button class="btn btn-secondary" onclick="decreaseQuantity(${result.p_id}, ${result.stock},${result.price})">-</button>
                        <p id="quantity${result.p_id}" class="quantity" style="border: 1px solid #ccc; padding: 10px;">1</p>
                        <button class="btn btn-success" onclick="increaseQuantity(${result.p_id}, ${result.stock},${result.price} )">+</button>
                    </div>
                    <a onclick="addToCart(${result.p_id})" class="add-btn">Add To Cart</a>
                </div>
                
                
                
                
`;




                    // Generate the product buy button HTML
                    var productBuyButton = `<a href="product-details.html" class="buy-btn">Buy it Now</a>`;

                    // Generate the product wishlist and compare options HTML
                    var productOptions = `
                        <div class="product__wishlist-wrap">
                            <a href="product-details.html"><i class="flaticon-love"></i>Add To Wishlist</a>
                        </div>
                    `;

                    // Generate the product social sharing icons HTML
                    var productSocialIcons = `
                        <div class="product__details-bottom">
                            <ul class="list-wrap">
                                <li class="product__details-social">
                                    <span class="title">Share :</span>
                                    <ul class="list-wrap">
                                        <li><a href="https://www.facebook.com/" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
                                        <li><a href="https://twitter.com/" target="_blank"><i class="fab fa-twitter"></i></a></li>
                                        <li><a href="https://www.whatsapp.com/" target="_blank"><i class="fab fa-whatsapp"></i></a></li>
                                        <li><a href="https://www.instagram.com/" target="_blank"><i class="fab fa-instagram"></i></a></li>
                                        <li><a href="https://www.youtube.com/" target="_blank"><i class="fab fa-youtube"></i></a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    `;

                    // Concatenate all the product details HTML
                    var productHTML = productReviews + productPrice + productDescription + productQuantity + productBuyButton + productOptions + productSocialIcons;

                    var productImage = `
                        <a href="data:image/jpeg;base64,${result.productPicture}" class="popup-image">
                            <img src="data:image/jpeg;base64,${result.productPicture}" alt="Product Image" style="width: 500px; height: 480px; object-fit: cover;">
                        </a>
                    `;
                    container0.html(productImage);
                    // Append the product details HTML to the container
                    container.append(productHTML);
                });
            } else {
                // No product items found, you might want to handle this case accordingly
            }
        }

        ,
        error: function (error) {
            console.error('Error adding item to cart:', error);

        }
    });

});

function addToCart(item_id, price) {
    var email = localStorage.getItem('email');

    $.ajax({
        url: 'http://localhost:3001/add_to_cart?item_id=' + item_id + '&email=' + email + '&price=' + price,
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
            $.ajax({
                url: 'http://localhost:3001/cart_item_number?email=' + email,
                method: 'GET',
                success: function (data) {
                    var cartCount = $('.header-cart-two span');
                    var currentCount = parseInt(cartCount.text());
                    var newCartCount = (currentCount * 0) + parseInt(data.itemCount);
                    cartCount.text(newCartCount);

                    var totalPrice = data.total;
                    $('.price_of_total').text('$' + totalPrice.toFixed(2));
                },
                error: function (error) {
                    console.error('Error getting cart item number:', error);
                    alert('Error getting cart item number. Please try again.');
                }
            });
        },
        error: function (error) {
            console.error('Error adding item to cart:', error);
            alert('Error adding item to cart. Please try again.');
        }
    });
}



function increaseQuantity(productId, stock, price) {
    var quantityElement = $('#quantity' + productId);
    var currentQuantity = parseInt(quantityElement.text());

    if (currentQuantity < stock) {
        quantityElement.text(currentQuantity + 1);
        // Get the text content of the .price_of_total element and convert it to a numeric value
        var totalPrice = parseFloat($('.price_of_total').text().replace('$', ''));

        var totalWithQuantityPrice = totalPrice + price;

        $('.price_of_total').text('$' + totalWithQuantityPrice.toFixed(2));


    } else {
        $('#message').text('Product quantity cannot exceed stock!');
        showDialog_donot_reload();
    }
}

function decreaseQuantity(productId, stock, price) {
    var quantityElement = $('#quantity' + productId);
    var currentQuantity = parseInt(quantityElement.text());

    if (currentQuantity > 1) {
        quantityElement.text(currentQuantity - 1);
        var totalPrice = parseFloat($('.price_of_total').text().replace('$', ''));

        var totalWithQuantityPrice = totalPrice - price;

        $('.price_of_total').text('$' + totalWithQuantityPrice.toFixed(2));
    }
    else {
        $('#message').text('Product quantity cannot be minimized!');
        showDialog_donot_reload();
    }
}




