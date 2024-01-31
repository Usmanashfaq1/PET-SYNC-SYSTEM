$(document).ready(function () {

    $.ajax({
        url: 'http://localhost:4000/get_profiles',
        method: 'GET',
        success: function (data) {
            // Clear existing pet profiles
            $('#petProfiles').empty();

            if (data && data.length > 0) {
                data.forEach(function (result) {
                    var card = `
<div class="col-md-4 mb-4">
    <div class="card">
        <img src="data:image/jpeg;base64,${result.petPicture}" class="card-img-top" alt="Pet Picture" style="height: 200px; object-fit: cover;">
        <div class="card-body">
            <h5 class="card-title">${result.petname}</h5>
            <p class="card-text">
                <strong>Owner:</strong> ${result.pet_owner}<br>
                <strong>Gender:</strong> ${result.gender}<br>
                <strong>Age:</strong> ${result.age}<br>
                <strong>Breed:</strong> ${result.breed}<br>
                <strong>Species:</strong> ${result.species}<br>
                <strong>Weight:</strong> ${result.weight}<br>
                <strong>Color:</strong> ${result.color}<br>
                <strong>About:</strong> ${result.about}
            </p>
            <p class="card-text"><strong>Price:</strong> $${result.price}</p>
            <button class="btn btn-success" onclick="addToCart(${result.id})">Add to Cart</button>
        </div>
    </div>
</div>
`;

                    $('#petProfiles').append(card);
                });
            } else {
                // Pet details not found
                $('#petProfiles').append('<div class="col-md-12">No pet profile details found</div>');
            }
        },
        error: function (error) {
            console.error('Error fetching pet details:', error);
            alert(error);
            $('#petProfiles').empty();
        }
    });
});

function addToCart(petId) {
    // Add logic to add the selected pet to the shopping cart
    alert(`Pet with ID ${petId} added to the cart.`);
}