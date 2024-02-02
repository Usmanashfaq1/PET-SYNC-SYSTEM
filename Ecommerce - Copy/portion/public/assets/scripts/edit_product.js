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
                        <td><button class="btn btn-warning" onclick="openProfile(${result.p_id})">Update</button></td>
                        <td><button class="btn btn-danger" onclick="deleteProduct(${result.p_id})">Delete</button></td>
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


function deleteProduct(id) {
    $.ajax({
        url: 'http://localhost:4000/delete_product/' + id, 
        method: 'DELETE',
        success: function (data) {
            if (data === 1) {
                document.getElementById('message').innerText = 'Product is Deleted Successfully!';
                showDialog();
            } else {
                document.getElementById('message').innerText = 'Internal failure at backend!';
                showDialog();
            }
        },
        error: function (error) {
            console.error('Error deleting product:', error);
            alert('Error deleting product at the backend. Please try again.');
            $('#Data_table').empty();
        }
    });
}


document.getElementById('category').addEventListener('change', function () {
    
    var selectedCategory = this.value;

    if(selectedCategory == 'Pet')
    {
        $.ajax({
            url: 'http://localhost:4000/get_specific_product/'+selectedCategory,
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
                            <td><button class="btn btn-warning" onclick="openProfile(${result.p_id})">Update</button></td>
                            <td><button class="btn btn-danger" onclick="deleteProduct(${result.p_id})">Delete</button></td>
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
    }
    else if(selectedCategory == 'Pet Food')
    {
        $.ajax({
            url: 'http://localhost:4000/get_specific_product/'+selectedCategory,
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
                            <td><button class="btn btn-warning" onclick="openProfile(${result.p_id})">Update</button></td>
                            <td><button class="btn btn-danger" onclick="deleteProduct(${result.p_id})">Delete</button></td>
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
    }
    else if(selectedCategory == 'Pet Medicine')
    {
        $.ajax({
            url: 'http://localhost:4000/get_specific_product/'+selectedCategory,
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
                            <td><button class="btn btn-warning" onclick="openProfile(${result.p_id})">Update</button></td>
                            <td><button class="btn btn-danger" onclick="deleteProduct(${result.p_id})">Delete</button></td>
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
    }
    else
    {
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
                            <td><button class="btn btn-warning" onclick="openProfile(${result.p_id})">Update</button></td>
                            <td><button class="btn btn-danger" onclick="deleteProduct(${result.p_id})">Delete</button></td>
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
    }
});
