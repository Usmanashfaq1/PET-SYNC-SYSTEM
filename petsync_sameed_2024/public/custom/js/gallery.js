
document.getElementById("search-user-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the value of the input field
    var username = document.getElementById("search-text").value;

    // Redirect to the URL with the username as a parameter
    window.location.href = "/account/" + username;
});



SVGInject(document.querySelectorAll("img.injectable"));
