let cart_list= [];
document.addEventListener('DOMContentLoaded', function () {
    cart_list = [-1];
    feather.replace();
    all_products();
    email = localStorage.getItem('email');
    document.getElementById('user').textContent = email;

    $.ajax({
        url: 'http://localhost:4000/cart_item_number?email=' + email,
        method: 'GET',
        success: function (data) {
                var cartCount = $('#cartId');
                var currentCount = parseInt(cartCount.text());
                cartCount.text((currentCount *0)+ data);
        },
        error: function (error) {
            console.error('Error adding item to cart:', error);
            alert('Error adding item to cart. Please try again.');
        }
    });
});

function all_products() {
    $.ajax({
        url: 'http://localhost:4000/get_products',
        method: 'GET',
        success: function (data) {
            // Clear existing product items
            $('#tab-1 .row').empty();

            if (data && data.length > 0) {
                data.forEach(function (result) {
                    // Ensure the rating is between 1 and 5
                    var rating = Math.min(5, Math.max(1, result.rating));

                    // Generate star icons based on the rating
                    var starIcons = '';
                    for (var i = 0; i < 5; i++) {
                        if (i < rating) {
                            // Display yellow star for the rated part
                            starIcons += '<i class="bi bi-star-fill text-warning"></i>';
                        } else {
                            // Display empty star for the unrated part
                            starIcons += '<i class="bi bi-star text-warning"></i>';
                        }
                    }

                    // Generate the product item HTML
                    var productItem = `
<div class="col-md-6 col-lg-4 col-xl-3 product-item" style="height: 400px; overflow: hidden;" >
<div class="rounded position-relative fruite-item" style="height: 100%; overflow: hidden;">
<div class="fruite-img" style="height: 60%; overflow: hidden;">
    <img src="data:image/jpeg;base64,${result.productPicture}" class="img-fluid w-100 rounded-top" alt="Product Image" style="width: 100%; height: 100%; object-fit: cover;">
</div>
<div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">${result.product_name}</div>
<div class="p-4 border border-secondary border-top-0 rounded-bottom" style="height: 40%; overflow: hidden;">
    <div class="d-flex justify-content-center mb-2">
        <div class="rating">${starIcons}</div>
    </div>
    <div class="d-flex justify-content-center mb-1">
        <p class="text-dark fs-5 fw-bold mb-0">$${result.price}</p>
    </div>
    <div class="d-flex justify-content-center mb-1">
        <p class="text-dark mb-2 fs-5 fw-bold mb-0">${result.category}</p>
    </div>

    <div class="d-flex justify-content-center">
        <!-- Add to Cart button with onclick event -->
        <button class="btn border border-secondary rounded-pill px-3 text-primary" onclick="addToCart(${result.p_id})">
            <i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
        </button>
        <!-- Added a space after the button -->
       
    </div>
</div>

</div>

</div>
`;

                    // Append the dynamically generated product item to the container
                    $('#tab-1 .row').append(productItem);
                });
            } else {
                // No product items found
                $('#tab-1 .row').append('<div class="col-md-12">No product items found</div>');
            }
        },
        error: function (error) {
            console.error('Error fetching product details:', error);
            alert(error);
            $('#tab-1 .row').empty();
        }
    });
}

function displayAll(value) {
    if (value == 'All') {
        all_products();
    }
    else {
        $.ajax({
            url: 'http://localhost:4000/get_specific_product/' + value,
            method: 'GET',
            success: function (data) {
                // Clear existing product items
                $('#tab-1 .row').empty();

                if (data && data.length > 0) {
                    data.forEach(function (result) {
                        // Ensure the rating is between 1 and 5
                        var rating = Math.min(5, Math.max(1, result.rating));

                        // Generate star icons based on the rating
                        var starIcons = '';
                        for (var i = 0; i < 5; i++) {
                            if (i < rating) {
                                // Display yellow star for the rated part
                                starIcons += '<i class="bi bi-star-fill text-warning"></i>';
                            } else {
                                // Display empty star for the unrated part
                                starIcons += '<i class="bi bi-star text-warning"></i>';
                            }
                        }

                        // Generate the product item HTML
                        var productItem = `
<div class="col-md-6 col-lg-4 col-xl-3 product-item" style="height: 400px; overflow: hidden;" >
<div class="rounded position-relative fruite-item" style="height: 100%; overflow: hidden;">
    <div class="fruite-img" style="height: 60%; overflow: hidden;">
        <img src="data:image/jpeg;base64,${result.productPicture}" class="img-fluid w-100 rounded-top" alt="Product Image" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">${result.product_name}</div>
    <div class="p-4 border border-secondary border-top-0 rounded-bottom" style="height: 40%; overflow: hidden;">
        <div class="d-flex justify-content-center mb-2">
            <div class="rating">${starIcons}</div>
        </div>
        <div class="d-flex justify-content-center mb-1">
            <p class="text-dark fs-5 fw-bold mb-0">$${result.price}</p>
        </div>
        <div class="d-flex justify-content-center mb-1">
            <p class="text-dark mb-2 fs-5 fw-bold mb-0">${result.category}</p>
        </div>

        <div class="d-flex justify-content-center">
            <button class="btn border border-secondary rounded-pill px-3 text-primary" onclick="addToCart(${result.p_id}">
                <i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
            </button>
            <!-- Added a space after the button -->
           
        </div>
    </div>
    
</div>

</div>
`;

                        // Append the dynamically generated product item to the container
                        $('#tab-1 .row').append(productItem);
                    });
                } else {
                    // No product items found
                    $('#tab-1 .row').append('<div class="col-md-12">No product items found</div>');
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



$('#carouselId').carousel({
    interval: 2000
});

// function addToCart(product_id) {
//     var cartCount = $('#cartId');
//     var currentCount = parseInt(cartCount.text());

//     if (!cart_list.includes(product_id)) {
//         cartCount.text(currentCount + 1);
//         cart_list.push(product_id);
//         document.getElementById('message').innerText = 'Added to Cart!';
//         showDialog_donot_reload();

//     } else {
//         document.getElementById('message').innerText = 'Item Already Added to Cart!';
//         showDialog_donot_reload();
//     }
// }

// function setIdOfCartItems() {
//     localStorage.setItem('idOfCartItems', JSON.stringify(cart_list));
// }


function addToCart(item_id) {
    var email = localStorage.getItem('email');

    $.ajax({
        url: 'http://localhost:4000/add_to_cart?item_id=' + item_id + '&email=' + email,
        method: 'POST',
        success: function (data) {
            if (data === 1) {
                document.getElementById('message').innerText = 'Item Added to Cart!';
                showDialog_donot_reload();
                // var cartCount = $('#cartId');
                // var currentCount = parseInt(cartCount.text());
                // cartCount.text(currentCount + 1);
            } else {
                document.getElementById('message').innerText = 'Item Already Added to Cart!';
                showDialog();
            }
        },
        error: function (error) {
            console.error('Error adding item to cart:', error);
            alert('Error adding item to cart. Please try again.');
        }
    });

    //check count of cart from DB

    $.ajax({
        url: 'http://localhost:4000/cart_item_number?email=' + email,
        method: 'GET',
        success: function (data) {
                var cartCount = $('#cartId');
                var currentCount = parseInt(cartCount.text());
                cartCount.text((currentCount *0)+ data);
        },
        error: function (error) {
            console.error('Error adding item to cart:', error);
            alert('Error adding item to cart. Please try again.');
        }
    });
  
}






// document.getElementById('product').addEventListener('submit', function (event) {
//     event.preventDefault();
//     fetch('/updated_product_data', {
//         method: 'POST',
//         body: new FormData(this),
//     })
//         .then(response => response.json())
//         .then(data => {
//             if (data === 1) {
//                 document.getElementById('message').innerText = 'Item Added to Cart!';
//                 showDialog();          
                
//             } else {
//                 document.getElementById('message').innerText = 'Item Already Added to Cart!';
//                 showDialog();
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// });