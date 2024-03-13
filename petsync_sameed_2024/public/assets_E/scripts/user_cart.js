document.addEventListener('DOMContentLoaded', function () {
    email_e = localStorage.getItem('email_e');
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
                            <button class="btn btn-danger" onclick="removeFromCart(${result.item_id})">Remove from Cart</button>
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
});





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

                window.location.reload();
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


