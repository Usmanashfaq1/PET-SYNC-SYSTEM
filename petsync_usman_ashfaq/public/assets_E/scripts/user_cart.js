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


// function calculateAndDisplayTotal(cartItems) {
//     // Calculate the total based on the product details
//     var total = cartItems.reduce(function (acc, item) {
//         return acc + item.price * parseInt($('#quantity' + item.p_id).text());
//     }, 0);

//     // Update the total element
//     document.getElementById('total').innerText = 'Total: $' + total.toFixed(2);
// }

// function increaseQuantity(productId, stock) {
//     var quantityElement = $('#quantity' + productId);
//     var currentQuantity = parseInt(quantityElement.text());

//     if (currentQuantity < stock) {
//         quantityElement.text(currentQuantity + 1);
//     } else {
//         document.getElementById('message').innerText = 'Product quantity cannot exceed stock!';
//         showDialog_donot_reload();
//     }
// }


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

                window.location.href = "/item_cart";
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



// function checkoutPage() {
//     // Retrieve email from localStorage
//     var email_e = localStorage.getItem('email_e');

//     // Make AJAX call to fetch cart items
//     $.ajax({
//         url: 'http://localhost:3001/get_cart_items?email_e=' + email_e,
//         method: 'GET',
//         success: function (data) {
//             if (data && data.length > 0) {
//                 // Construct the details to be appended to the Stripe payment link
//                 var details = "";
//                 data.forEach(function (result) {
//                     details += `&item_name=${encodeURIComponent(result.product_name)}&quantity=${encodeURIComponent(result.quantity)}&description=${encodeURIComponent(result.description)}`;
//                 });

//                 // Construct the complete payment link with appended details
//                 var paymentLink = 'https://buy.stripe.com/test_bIYbJ5d9Y0iZ7Uk288' + details;

//                 // Open the payment link in a new tab
//                 window.open(paymentLink, '_blank');
//             } else {
//                 alert('No items found in cart.');
//             }
//         },
//         error: function (error) {
//             console.error('Error fetching product details:', error);
//             alert('Error fetching product details at the backend. Please try again.');
//         }
//     });
// }

function checkoutPage() {
//     var email_e = localStorage.getItem('email_e');
    
//     // Fetch items from the cart
//     $.ajax({
//         url: 'http://localhost:3001/get_cart_items?email_e=' + email_e,
//         method: 'GET',
//         success: function (cartItems) {
//             var items = [];
//             cartItems.forEach(function (item) {
//                 items.push({
//                     price: item.price,
//                     quantity: item.quantity,
//                     name: item.product_name,
//                     picture: item.productPicture
//                 });
//             });

//             $.ajax({
//                 url: 'http://localhost:3001/create_checkout_session',
//                 method: 'POST',
//                 contentType: 'application/json',
//                 data: JSON.stringify({
//                     email: email_e,
//                     items: items
//                 }),
//                 success: function (data) {
//                     if (data && data.sessionId) {
//                         var stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY);
//                         stripe.redirectToCheckout({
//                             sessionId: data.sessionId,
//                             customerEmail: email_e,
//                             items: items,
//                             successUrl: 'http://localhost:3001/success',
//                             cancelUrl: 'http://localhost:3001/failure'
//                         }).then(function (result) {
//                             if (result.error) {
//                                 console.error('Error redirecting to checkout:', result.error);
//                                 alert('Error redirecting to checkout. Please try again.');
//                             }
//                         });
//                     } else {
//                         alert('Error creating Stripe Checkout session.');
//                     }
//                 },
//                 error: function (error) {
//                     console.error('Error creating Stripe Checkout session:', error);
//                     alert('Error creating Stripe Checkout session. Please try again.');
//                 }
//             });
//         },
//         error: function (error) {
//             console.error('Error fetching cart items:', error);
//             alert('Error fetching cart items. Please try again.');
//         }
//     });
}
