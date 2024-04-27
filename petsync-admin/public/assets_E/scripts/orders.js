function get_order()
{
    $.ajax({
        url: 'http://localhost:9000/get_orders',
        method: 'GET',
        success: function (data) {
            $('#Data_table').empty();
            if (data && data.length > 0) {
                data.forEach(function (result) {
                    var orderRow = $('<tr>');
                    
                    orderRow.html(`
                        <td style="font-weight:700">${result.order_id}</td>
                        <td style="font-weight:700">${result.customer_name}</td>
                        <td style="font-weight:700">${result.customer_email}</td>
                        <td>
                            <select class="statusDropdown">
                                <option value="pending" ${result.status === 'pending' ? 'selected' : ''}>Order Pending</option>
                                <option value="confirmed" ${result.status === 'confirmed' ? 'selected' : ''}>Order Confirmed</option>
                                <option value="shipped" ${result.status === 'shipped' ? 'selected' : ''}>Order Shipped</option>
                                <option value="delivered" ${result.status === 'delivered' ? 'selected' : ''}>Order Delivered</option>
                            </select>
                        </td>
                        <td style="font-weight:700">${result.amount_paid}</td>
                        <td style="font-weight:700">${result.Date}</td>
                    `);

                    $('#Data_table').append(orderRow);
                });

                $('.statusDropdown').change(function () {
                    var newStatus = $(this).val(); 
                    var orderId = $(this).closest('tr').find('td:first').text(); 
                    updateStatus(orderId, newStatus); 
                });
            } else {
                $('#Data_table').append('<tr><td colspan="6">No orders found</td></tr>');
            }
        },
        error: function (error) {
            console.error('Error fetching orders:', error);
            alert('Error fetching orders. Please try again.');
            $('#Data_table').empty();
        }
    });

    function updateStatus(orderId, newStatus) {
        $.ajax({
            url: 'http://localhost:9000/update_status',
            method: 'POST',
            data: JSON.stringify({ orderId: orderId, newStatus: newStatus }), // Sending orderId and newStatus in the request body
            contentType: 'application/json', // Specify content type as JSON
            success: function (response) {
                console.log('Status updated successfully:', response);
                // Update the status directly in the table
                $(`td:contains(${orderId})`).siblings('.status').text(newStatus);
                get_order(); // Assuming get_order() is to be called to refresh the order list
            },
            error: function (error) {
                console.error('Error updating status:', error);
                alert('Error updating status. Please try again.');
            }
        });
    }
    
    
    


}

document.addEventListener('DOMContentLoaded', function () {

    get_order();
   
});
