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
