document.addEventListener('DOMContentLoaded', function () {
    email = localStorage.getItem('email');
    $.ajax({
        url: 'http://localhost:4000/get_cart_items?email=' + email,
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
                        <td style="font-weight: 700">
                            <span id="quantity${result.p_id}">1</span>
                            <button class="btn btn-success" onclick="increaseQuantity(${result.p_id}, ${result.stock})">+</button>
                        </td>
                        <td style="font-weight: 700">${result.description}</td>
                        <td>
                            <button class="btn btn-danger" onclick="removeFromCart(${result.p_id})">Remove from Cart</button>
                        </td>
                    `);
                    // Append the row to the table
                    $('#Data_table').append(row);
                });
            } else {
                // Product details not found
                $('#Data_table').append('<tr><td colspan="9">No Items found in Cart</td></tr>');
            }

            // Calculate and display the total
            calculateAndDisplayTotal(data);
        },
        error: function (error) {
            console.error('Error fetching product details:', error);
            alert('Error fetching product details at the backend. Please try again.');
            $('#Data_table').empty();
        }
    });
});

function calculateAndDisplayTotal(cartItems) {
    // Calculate the total based on the product details
    var total = cartItems.reduce(function (acc, item) {
        return acc + item.price * parseInt($('#quantity' + item.p_id).text());
    }, 0);

    // Update the total element
    document.getElementById('total').innerText = 'Total: $' + total.toFixed(2);
}

function increaseQuantity(productId, stock) {
    var quantityElement = $('#quantity' + productId);
    var currentQuantity = parseInt(quantityElement.text());

    if (currentQuantity < stock) {
        quantityElement.text(currentQuantity + 1);
    } else {
        document.getElementById('message').innerText = 'Product quantity cannot exceed stock!';
        showDialog_donot_reload();
    }
}


function removeFromCart(id) {
    $.ajax({
        url: 'http://localhost:4000/remove_from_cart/' + id,
        method: 'DELETE',
        success: function (data) {
            var cartCount = $('#cartId');
            var currentCount = parseInt(cartCount.text(), 10);
            cartCount.text(currentCount - 1);
            
            if (data === 1) {
                document.getElementById('message').innerText = 'Item Removed from Cart!';
                showDialog();
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
