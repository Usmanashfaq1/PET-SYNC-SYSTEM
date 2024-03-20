document.addEventListener('DOMContentLoaded', function () {
    displayCartItems();
    countOfItemsInWishList();
    countOfItemsInCart();
});


function displayCartItems()
{
    email_e = localStorage.getItem('email_e');
    name = localStorage.getItem('name');
    $.ajax({
        url: 'http://localhost:3001/get_cart_items?email_e=' + email_e, // Adjust the URL as per your server endpoint
        method: 'GET',
        success: function (data) {
            // Clear existing table rows
            $('#Data_table').empty();
            if (data && data.length > 0) {
                data.forEach(function (result) {
                    // Create a new table row
                    var row = $('<tr>');
                    // Populate the row with product details
                    row.html(`
                        <td><img src="data:image/jpeg;base64,${result.productPicture}" alt="Product Picture" style="width: 4rem; height: 4rem;"></td>
                        <td style="font-weight: 700">${result.product_name}</td>
                        <td style="font-weight: 700">${result.category}</td>
                        <td style="font-weight: 700">${result.price}</td>
                        <td style="font-weight: 700">${result.quantity}</td>
                        <td style="font-weight: 700">${result.description}</td>
                        <td>
                            <button class="btn btn-danger" onclick="removeFromCart(${result.item_id})">&#x2716;</button>
                        </td>
                    `);
                    // Append the row to the table
                    $('#Data_table').append(row);
                });
            } else {
                // Product details not found
                $('#Data_table').append('<tr><td colspan="7">No Items found in Cart</td></tr>');
            }
        },
        error: function (error) {
            console.error('Error fetching product details:', error);
            alert('Error fetching product details at the backend. Please try again.');
            $('#Data_table').empty();
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



function removeFromCart(id) {
    $.ajax({
        url: 'http://localhost:3001/remove_from_cart/' + id,
        method: 'DELETE',
        success: function (data) {
            var cartCount = $('#cartId');
            var currentCount = parseInt(cartCount.text(), 10);
            cartCount.text(currentCount - 1);

            if (data === 1) {
                document.getElementById('message').innerText = 'Item Removed from Cart!';
                showDialog();
                displayCartItems();
                countOfItemsInCart();

            } else {
                document.getElementById('message').innerText = 'Item not found in Cart!';
                showDialog();
            }
        },
        error: function (error) {
            console.error('Error removing item from cart:', error);
            alert('Error removing item from cart. Please try again.');
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
