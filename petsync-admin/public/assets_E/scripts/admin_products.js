document.getElementById('product').addEventListener('submit', function (event) {
    event.preventDefault();
    fetch('/add_product', {
        method: 'POST',
        body: new FormData(this),
    })
        .then(response => response.json())
        .then(data => {
            if (data === 1) {
                document.getElementById('message').innerText = 'Product is Added Successfully!';
                showDialog();
            } else if (data === -1){
                document.getElementById('message').innerText = 'Please dont add product with same name!';
                showDialog();
            }
            else {
                document.getElementById('message').innerText = 'failuer at backend!';
                showDialog();
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
});