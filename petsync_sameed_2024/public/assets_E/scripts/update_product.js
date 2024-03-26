document.addEventListener('DOMContentLoaded', function () {
    var id = localStorage.getItem('Update_id');
    document.getElementById('update_id').value = id;
    $.ajax({
        url: 'http://localhost:4000/load_update_product/' + id,
        method: 'GET',
        success: function (data) {
            if (data && data.length > 0) {
                const productData = data[0];
                document.getElementById('pname').value = productData.product_name;
                document.getElementById('category').value = productData.category;
                document.getElementById('price').value = productData.price;
                document.getElementById('stock').value = productData.stock;
                document.getElementById('rating').value = productData.rating;
                document.getElementById('description').value = productData.description;
            }
        },
        error: function (error) {
            console.error('Error fetching product details:', error);
            alert('Error fetching product details at the backend. Please try again.');
            $('#Data_table').empty();
        }
    });
});




document.getElementById('product').addEventListener('submit', function (event) {
    event.preventDefault();
    fetch('/updated_product_data', {
        method: 'POST',
        body: new FormData(this),
    })
        .then(response => response.json())
        .then(data => {
            if (data === 1) {
                document.getElementById('message').innerText = 'Product is Updated Successfully!';
                showDialog_new_page();          
                
            } else {
                document.getElementById('message').innerText = 'Internal failure at backend!';
                showDialog_new_page();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});