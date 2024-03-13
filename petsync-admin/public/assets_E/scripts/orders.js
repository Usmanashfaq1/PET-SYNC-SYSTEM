// document.addEventListener('DOMContentLoaded', function () {
//     $.ajax({
//         url: 'http://localhost:9000/get_orders',
//         method: 'GET',
//         success: function (data) {
//             // Clear existing table rows
//             $('#Data_table').empty();
//             if (data && data.length > 0) {
//                 data.forEach(function (result) {
//                     // Create a new table row
//                     var row = $('<tr>');
                    
//                     // Populate the row with order details
//                     row.html(`
//                         <td style="font-weight:700">${result.order_id}</td>
//                         <td style="font-weight:700">${result.customer_name}</td>
//                         <td style="font-weight:700">${result.customer_email}</td>
//                         <td style="font-weight:700">${result.product_list}</td>
//                         <td style="font-weight:700">${result.quantity}</td>
//                         <td style="font-weight:700">${result.status}</td>
//                         <td style="font-weight:700">${result.amount_paid}</td>
//                     `);

//                     // Append the row to the table
//                     $('#Data_table').append(row);

//                     // Iterate over each product in the order
//                     result.products.forEach(function (product) {
//                         // Create a new row for each product
//                         var productRow = $('<tr>');
                        
//                         // Populate the product row with product details and picture
//                         productRow.html(`
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td style="font-weight:700">${product.productName}</td>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td><img src="data:image/jpeg;base64,${product.productPicture}" alt="Product Picture" style="width: 4rem; height: 4rem;"></td>
//                         `);
                        
//                         // Append the product row to the table
//                         $('#Data_table').append(productRow);
//                     });
//                 });
//             } else {
//                 // Product details not found
//                 $('#Data_table').append('<tr><td colspan="8">No product details found</td></tr>');
//             }
//         },
//         error: function (error) {
//             console.error('Error fetching product details:', error);
//             alert('Error fetching product details at the backend. Please try again.');
//             $('#Data_table').empty();
//         }
//     });
// });



document.addEventListener('DOMContentLoaded', function () {
    $.ajax({
        url: 'http://localhost:9000/get_orders',
        method: 'GET',
        success: function (data) {
            // Clear existing table rows
            $('#Data_table').empty();
            if (data && data.length > 0) {
                data.forEach(function (result) {
                    // Create a new table row for the order details
                    var orderRow = $('<tr>');
                    
                    // Populate the order row with order details
                    orderRow.html(`
                        <td style="font-weight:700">${result.order_id}</td>
                        <td style="font-weight:700">${result.customer_name}</td>
                        <td style="font-weight:700">${result.customer_email}</td>
                        <td style="font-weight:700">${result.product_list}</td>
                        <td style="font-weight:700">${result.quantity}</td>
                        <td style="font-weight:700">${result.status}</td>
                        <td style="font-weight:700">${result.amount_paid}</td>
                    `);

                    // Append the order row to the table
                    $('#Data_table').append(orderRow);

                });
            } else {
                // No orders found
                $('#Data_table').append('<tr><td colspan="8">No orders found</td></tr>');
            }
        },
        error: function (error) {
            console.error('Error fetching orders:', error);
            alert('Error fetching orders. Please try again.');
            $('#Data_table').empty();
        }
    });
});
