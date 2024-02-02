document.addEventListener('DOMContentLoaded', function () {
    $.ajax({
        url: 'http://localhost:4000/get_products',
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
                        <td>${result.product_name}</td>
                        <td>${result.category}</td>
                        <td>${result.price}</td>
                        <td>${result.stock}</td>
                        <td>${result.rating}</td>
                        <td>${result.description}</td>
                        <td><img src="data:image/jpeg;base64,${result.productPicture}" alt="Product Picture" style="width: 4rem; height: 4rem;"></td>
                        <td><button class="btn btn-warning" onclick="openProfile(${result.id})">Update</button></td>
                        <td><button class="btn btn-danger" onclick="openProfile(${result.id})">Delete</button></td>
                    `);
                    // Append the row to the table
                    $('#Data_table').append(row);
                });
            } else {
                // Product details not found
                $('#Data_table').append('<tr><td colspan="9">No product details found</td></tr>');
            }
        },
        error: function (error) {
            console.error('Error fetching product details:', error);
            alert('Error fetching product details at the backend. Please try again.');
            $('#Data_table').empty();
        }
    });
});
