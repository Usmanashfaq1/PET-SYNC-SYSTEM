$(document).ready(function () {
   
    // Your existing code for fetching pet profiles...
    $.ajax({
        url: 'http://localhost:4000/get_profiles',
        method: 'GET',
        success: function (data) {
            // Clear existing product items
            $('.tab-content .tab-pane .row').empty();

            if (data && data.length > 0) {
                data.forEach(function (result) {
                    // Calculate the rating based on age (you can adjust the formula as needed)
                    var rating = Math.min(5, Math.ceil(result.age / 10));

                    // Generate star icons based on the rating
                    var starIcons = '';
                    for (var i = 0; i < 5; i++) {
                        if (i < rating) {
                            // Display yellow star for the rated part
                            starIcons += '<i class="bi bi-star-fill text-warning"></i>';
                        } else {
                            // Display empty star for the unrated part
                            starIcons += '<i class="bi bi-star text-warning"></i>';
                        }
                    }

                    // Generate the product item HTML
                    var productItem = `
<div class="col-md-6 col-lg-4 col-xl-3 product-item" style="height: 400px; overflow: hidden;">
    <div class="rounded position-relative fruite-item" style="height: 100%; overflow: hidden;">
        <div class="fruite-img" style="height: 60%; overflow: hidden;">
            <img src="data:image/jpeg;base64,${result.petPicture}" class="img-fluid w-100 rounded-top" alt="Product Image" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">${result.petname}</div>
        <div class="p-4 border border-secondary border-top-0 rounded-bottom" style="height: 40%; overflow: hidden;">
            <div class="d-flex justify-content-center mb-2">
                <div class="rating">${starIcons}</div>
            </div>
            <p class="text-dark fs-5 fw-bold mb-0">$${result.age}</p>
            <p class="text-dark fs-5 fw-bold mb-0">${result.price}</p>
            <div class="d-flex justify-content-center">
                <!-- Add to Cart button with onclick event -->
                <button class="btn border border-secondary rounded-pill px-3 text-primary" onclick="addToCart(${result.petId}, '${result.petname}', ${result.age}, ${rating})">
                    <i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                </button>
            </div>
        </div>
    </div>
</div>
`;

                    // Append the dynamically generated product item to the container
                    $('#tab-1 .row').append(productItem);
                });
            } else {
                // No product items found
                $('#tab-1 .row').append('<div class="col-md-12">No product items found</div>');
            }
        },
        error: function (error) {
            console.error('Error fetching product details:', error);
            alert(error);
            $('.tab-content .tab-pane .row').empty();
        }
    });
    // Display cart items on page load
    updateCartIcon();
});



 // Additional code for shopping cart functionality
 let cart = [];

 function addToCart(petId, petName, petPrice, petRating) {
     let positionThisPetInCart = cart.findIndex((value) => value.petId == petId);

     if (cart.length <= 0) {
         cart = [{
             petId: petId,
             petName: petName,
             petPrice: petPrice,
             petRating: petRating,
             quantity: 1
         }];
     } else if (positionThisPetInCart < 0) {
         cart.push({
             petId: petId,
             petName: petName,
             petPrice: petPrice,
             petRating: petRating,
             quantity: 1
         });
     } else {
         // Only append quantity if it's different
         if (cart[positionThisPetInCart].quantity !== cart[positionThisPetInCart].quantity + 1) {
             cart[positionThisPetInCart].quantity = cart[positionThisPetInCart].quantity + 1;
         }
     }

     updateCartIcon();
 }

 function updateCartIcon() {
     const cartQuantitySpan = document.getElementById('cartQuantity');
     let totalQuantity = 0;

     if (cart.length > 0) {
         cart.forEach(item => {
             totalQuantity = totalQuantity + item.quantity;
         });
     }

     cartQuantitySpan.innerText = totalQuantity;
 }


// JavaScript logic for sliding the carousel every 3 seconds
$('#carouselId').carousel({
    interval: 2000
});