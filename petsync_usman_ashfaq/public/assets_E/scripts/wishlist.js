document.addEventListener('DOMContentLoaded', function () {
    countOfItemsInWishList();
    displayWishlistList();
});


function displayWishlistList()
{
    email_e = localStorage.getItem('email_e');
    name = localStorage.getItem('name');
    $.ajax({
        url: 'http://localhost:3001/get_wishlist_items?email_e=' + email_e,
        method: 'GET',
        success: function (data) {
            $('#Data_table').empty();
            if (data && data.length > 0) {
                data.forEach(function (result) {
                    var row = $('<tr>');
                    row.html(`
                        <td><img src="data:image/jpeg;base64,${result.productPicture}" alt="Product Picture" style="width: 4rem; height: 4rem;"></td>
                        <td style="font-weight: 700">${result.product_name}</td>
                        <td style="font-weight: 700">${result.category}</td>
                        <td style="font-weight: 700">${result.price}</td>
                        <td style="font-weight: 700">${result.description}</td>
                        <td>
                            <button class="btn btn-danger" onclick="removeFromwishlist(${result.item_id})">Remove from wishlist</button>
                        </td>
                    `);
                    $('#Data_table').append(row);
                });
            } else {
                $('#Data_table').append('<tr><td colspan="7">No Items found in Wishlist</td></tr>');
            }

        },
        error: function (error) {
            console.error('Error fetching wishlist items:', error);
            alert('Error fetching wishlist items. Please try again.');
            $('#Data_table').empty();
        }
    });
}

function removeFromwishlist(id) {
    $.ajax({
        url: 'http://localhost:3001/remove_from_wishlist/' + id,
        method: 'DELETE',
        success: function (data) {
            var cartCount = $('#cartId');
            var currentCount = parseInt(cartCount.text(), 10);
            cartCount.text(currentCount - 1);

            if (data === 1) {
                document.getElementById('message').innerText = 'Item Removed from wishlist!';
                showDialog();
                countOfItemsInWishList();
                displayWishlistList();
                // window.location.reload();
            } else {
                document.getElementById('message').innerText = 'Item cant be deleted from wishlist! server error';
                showDialog(); 
            }
        },
        error: function (error) {
            console.error('Error removing item from cart:', error);
            alert('Error removing item from cart. Please try again.');
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
