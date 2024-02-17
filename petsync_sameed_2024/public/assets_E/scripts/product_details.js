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
            var newCartCount = currentCount + parseInt(data);
            cartCount.text(newCartCount);
        },
        error: function (error) {
            console.error('Error adding item to cart:', error);
            alert('Error adding item to cart. Please try again.');
        }
    });

    var id = localStorage.getItem('id_detail_of_item');

    $.ajax({
        url: 'http://localhost:3001/get_product_detail_with_id?id=' + id,
        method: 'GET',
        success: function(data) {
            var container = $('.tab-pane.show.active#itemOne-tab-pane');
        
            if (data && data.length > 0) {
                data.forEach(function(result) {
                    // Generate the product image HTML with base64 encoded image
                    var productImage = `
                        <a href="data:image/jpeg;base64,${result.productPicture}" class="popup-image">
                            <img src="data:image/jpeg;base64,${result.productPicture}" alt="Product Image" style="width: 100%; height: 100%; object-fit: cover;">
                        </a>
                    `;
        
                    // Replace the content of the container with the new product image
                    container.html(productImage);
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
