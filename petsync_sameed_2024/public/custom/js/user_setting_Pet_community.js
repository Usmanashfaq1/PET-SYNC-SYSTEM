
feather.replace()



function openImage(imageSrc) {s
// Create a new element to display the enlarged image
var enlargedImage = document.createElement('img');
enlargedImage.src = imageSrc;
enlargedImage.classList.add('enlarged-image');

// Append the enlarged image to the body
document.body.appendChild(enlargedImage);

// Add an event listener to remove the enlarged image when clicked
enlargedImage.addEventListener('click', function() {
document.body.removeChild(enlargedImage);
});
}


document.getElementById("search-user-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the value of the input field
  var username = document.getElementById("search-text").value;

  // Redirect to the URL with the username as a parameter
  window.location.href = "/account/" + username;
});






SVGInject(document.querySelectorAll("img.injectable"));


// JavaScript to toggle sidebar
document.addEventListener("DOMContentLoaded", function () {
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const body = document.body;

menuToggle.addEventListener("click", function () {
sidebar.classList.toggle("sidebar-open");
body.classList.toggle("sidebar-open");
});
});

