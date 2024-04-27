document.addEventListener('DOMContentLoaded', function () {
    displayOrders();
});


function displayOrders() {
    var email_e = localStorage.getItem('email_e');
    var name = localStorage.getItem('name');
    $.ajax({
        url: 'http://localhost:3001/get_orders?email_e=' + email_e,
        method: 'GET',
        success: function (data) {
            $('#Data_table').empty();
            if (data && data.length > 0) {
                data.forEach(function (result) {
                    var row = $('<tr>');
                    row.html(`
                        <td style="font-weight: bold; color: #333;">${result.order_id}</td>
                        <td style="font-weight: bold; color: #333;">${result.customer_name}</td>
                        <td style="font-weight: bold; color: #333;">${result.customer_email}</td>
                        <td style="font-weight: bold; color: #333;">${result.status}</td>
                        <td style="font-weight: bold; color: #333;">${result.amount_paid}</td>
                        <td style="font-weight: bold; color: #333;">${result.Date}</td>
                        <td>
                        <button class="btn btn-primary" onclick="trackStatus(${result.order_id})">Track</button>
                        </td>
                    `);
                    $('#Data_table').append(row);
                });
            } else {
                $('#Data_table').append('<tr><td colspan="5" style="font-weight: bold; color: #333;">No Orders placed till now</td></tr>');
            }

        },
        error: function (error) {
            console.error('Error fetching orders:', error);
            alert('Error fetching orders. Please try again.');
            $('#Data_table').empty();
        }
    });
}


function trackStatus(id) {
    localStorage.setItem('id_of_order_selected', id);
    window.location.href = '/track';
}




