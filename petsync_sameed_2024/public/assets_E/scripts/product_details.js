let cart_list = [];
document.addEventListener('DOMContentLoaded', function () {
    productDetail();
    cart_list = [-1];
    email_e = localStorage.getItem('email_e');
    countOfItemsInCart();
    countOfItemsInWishList();
    getReviews();



});



function getReviews() {
    const name = localStorage.getItem('name');
    const product_id = localStorage.getItem('id_detail_of_item');
    $.ajax({
        url: 'http://localhost:3001/getReviews?product_id=' + product_id,
        method: 'GET',
        success: function (data) {
            // Check if data.reviews exists and it's an array
            if (data.reviews && Array.isArray(data.reviews)) {
                var reviews = data.reviews;

                var reviewCount = reviews.length;
                $('#reviewCount').text(reviewCount);

                $('#reviewsList').empty();

                if (reviewCount > 0) {
                    reviews.forEach((review, index) => {
                        const date = new Date(review.date);
                        const dateString = formatDate(date);
                        const isOwner = (review.name === name);

                        const reviewHTML = `
                            <div class="review-item" style="max-width: 600px; border-bottom: ${index !== reviewCount - 1 ? '1px solid #ccc' : 'none'}; padding-bottom: ${index !== reviewCount - 1 ? '20px' : '0'}; margin-bottom: ${index !== reviewCount - 1 ? '20px' : '0'};">
                                <div class="review-header" style="display:flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <h6 class="name">${review.name}</h6>
                                    </div>
                                    <div class="rating" style="margin-left: 20px;">
                                        ${getStarRatingHTML(review.rating)}
                                    </div>
                                </div>
                                <p class="comment" style="padding-bottom: 10px;">${review.description}</p>
                                
                                <div class="btn-group" style="width: 50%; display: flex; justify-content: space-between; margin-top: 10px;">
    <div style="display: flex; align-items: center;">
        <p class="date">${dateString}</p>
    </div>
    <div style="display: flex; justify-content: flex-end;">
        ${isOwner ? `<button class="btn btn-primary" style="width: 100px; height: 50px;" onclick="deleteReview('${review.id}')">Delete</button>` : ''}
    </div>
</div>

                            
                            </div>
                        `;
                        $('#reviewsList').append(reviewHTML);
                    });
                } else {
                    $('#reviewsList').html('<p>No reviews yet.</p>');
                }
            } else {
                console.error('Error: No reviews data found or it is not an array.');
                $('#reviewsList').html('<p>Error: No reviews data found or it is not an array.</p>');
            }
        },
        error: function (error) {
            console.error('Error getting reviews:', error);
            alert('Error getting reviews. Please try again.');
        }
    });
}


function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}




function getStarRatingHTML(rating) {
    const filledStars = '<i class="bx bxs-star"></i>'.repeat(rating);
    const emptyStars = '<i class="bx bx-star"></i>'.repeat(5 - rating);
    return filledStars + emptyStars;
}


function productDetail() {
    var id = localStorage.getItem('id_detail_of_item');
    email_e = localStorage.getItem('email_e');

    $.ajax({
        url: 'http://localhost:3001/get_product_detail_with_id?id=' + id + '&email_e=' + email_e,

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
                        <button class="btn btn-secondary" onclick="decreaseQuantity(${result.p_id}, ${result.currentItemQuantityInCart})">-</button>
                        <p id="quantity${result.p_id}" class="quantity" style="border: 1px solid #ccc; padding: 10px;">${result.currentItemQuantityInCart}</p>
                        <button class="btn btn-success" onclick="increaseQuantity(${result.p_id}, ${result.stock},${result.price}  ,${result.currentItemQuantityInCart})">+</button>
                    </div>
                    <a onclick="addToCart(${result.p_id}, ${result.price})" class="add-btn">Add To Cart</a>
                </div>
                
                
                
                
`;




                    // Generate the product buy button HTML
                    var productBuyButton = `<a href="/item_cart" class="buy-btn">Buy it Now</a>`;

                    // Generate the product wishlist and compare options HTML
                    var productOptions = `
                    <div>
    <i class="fa fa-heart-o" style="font-size: 24px; margin-right: 5px; cursor: pointer;" onclick="addTowishlist(${result.p_id})">&#x2764;&#xFE0F; Add to wishlist</i>
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

            }
        }

        ,
        error: function (error) {
            console.error('Error adding item to cart:', error);

        }
    });
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

            countOfItemsInCart();
            productDetail();
        },
        error: function (error) {
            console.error('Error adding item to cart:', error);
            alert('Error adding item to cart. Please try again.');
        }
    });
}


function addedtoCart(productId) {
    return new Promise(function (resolve, reject) {
        email_e = localStorage.getItem('email_e');
        item_id = productId;
        $.ajax({
            url: 'http://localhost:3001/check_added_to_cart?item_id=' + item_id + '&email_e=' + email_e,
            method: 'GET',
            success: function (data) {
                if (data === 1) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            },
            error: function (error) {
                console.error('Error checking cart:', error);
                alert('Error checking cart. Please try again.');
                reject(error);
            }
        });
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
            if (data.total == null) {
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



function increaseQuantity(productId, stock, price, currentItemQuantityInCart) {
    addedtoCart(productId)
        .then(function (isAdded) {
            if (isAdded) {
                // var quantityElement = $('#quantity' + productId);
                // var currentQuantity = parseInt(quantityElement.text());

                if (currentItemQuantityInCart <= stock) {
                    updateCartDetails(productId);

                } else {
                    $('#message').text('Product quantity cannot exceed stock!');
                    showDialog_donot_reload();
                }
            } else {
                addToCart(productId, price);
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
            alert('Error adding item to cart. Please try again.');
        });
}

function decreaseQuantity(productId, currentItemQuantityInCart) {
    // var quantityElement = $('#quantity' + productId);
    // var currentQuantity = parseInt(quantityElement.text());

    if (currentItemQuantityInCart > 1) {
        // Decrease the quantity by calling the appropriate function
        updateCartDetailsDeletion(productId);
    } else {
        $('#message').text('Product quantity cannot be minimized!');
        showDialog_donot_reload();
    }
}



function updateCartDetails(productId) {
    var id = productId;
    var email_e = localStorage.getItem('email_e');
    $.ajax({
        url: 'http://localhost:3001/cart_item_number_quantity?email_e=' + email_e + '&id=' + id,
        method: 'GET',
        success: function (data) {
            productDetail();
            countOfItemsInCart();

        },
        error: function (error) {
            console.error('Error getting cart item number:', error);
            alert('Error getting cart item number. Please try again.');
        }
    });
}

function updateCartDetailsDeletion(productId) {
    var email_e = localStorage.getItem('email_e');
    $.ajax({
        url: 'http://localhost:3001/cart_item_number_quantity_delete?email_e=' + email_e + '&id=' + productId,
        method: 'GET',
        success: function (data) {
            productDetail();
            countOfItemsInCart();
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






function setRating(value) {
    const allStars = document.querySelectorAll('.rating .star');
    const ratingInput = document.getElementById('ratingInput');

    ratingInput.value = value;

    allStars.forEach(star => {
        const starValue = parseInt(star.dataset.value);
        if (starValue <= value) {
            star.classList.replace('bx-star', 'bxs-star');
        } else {
            star.classList.replace('bxs-star', 'bx-star');
        }
    });
}

function submitReview() {
    const ratingInput = document.getElementById('ratingInput');
    const opinionTextarea = document.getElementById('opinion');
    const rating = parseInt(ratingInput.value);
    const opinion = opinionTextarea.value;
    const email = localStorage.getItem('email_e');
    const product_id = localStorage.getItem('id_detail_of_item');

    // Create an object with review data
    const reviewData = {
        rating: rating,
        opinion: opinion,
        email: email,
        product_id: product_id
    };

    $.ajax({
        url: 'http://localhost:3001/sendReview',
        method: 'POST',
        data: reviewData,
        success: function (data) {

            console.log("Review submitted successfully");
            getReviews();
        },
        error: function (error) {
            console.error('Error submitting review:', error);
            alert('Error submitting review. Please try again.');
        }
    });

    ratingInput.value = '';
    opinionTextarea.value = '';

    // Reset star ratings
    const allStars = document.querySelectorAll('.rating .star');
    allStars.forEach(star => {
        star.classList.replace('bxs-star', 'bx-star');
    });
}


function deleteReview(reviewId) {
    $.ajax({
        url: 'http://localhost:3001/deleteReview',
        method: 'POST',
        data: { reviewId: reviewId },
        success: function (data) {
            console.log("Review deleted successfully");
            getReviews();
        },
        error: function (error) {
            console.error('Error deleting review:', error);
            alert('Error deleting review. Please try again.');
        }
    });
}


function cancelReview() {
    const ratingInput = document.getElementById('ratingInput');
    const opinionTextarea = document.getElementById('opinion');

    ratingInput.value = '';
    opinionTextarea.value = '';

    // Reset star ratings
    const allStars = document.querySelectorAll('.rating .star');
    allStars.forEach(star => {
        star.classList.replace('bxs-star', 'bx-star');
    });
}
