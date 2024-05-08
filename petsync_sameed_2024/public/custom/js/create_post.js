
function openImage(imageSrc) {
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




  document.addEventListener('DOMContentLoaded', function() {
      const form = document.getElementById('uploadForm');

      form.addEventListener('submit', async function(event) {
          event.preventDefault();

          const formData = new FormData(this);

          try {
              const response = await fetch('/profile/postFeed', {
                  method: 'POST',
                  body: formData
              });

              const data = await response.json();

              if (data.success) {
                  // If the upload was successful, reload the current page
                  $('#message').text('Post Created Successfully!');
                  $('#overlay').show();

                  // Automatically close the dialog box after 3-4 seconds
              setTimeout(function() {
                  $('#overlay').hide();
              }, 5000); 
               // Clear the form fields
               form.reset();
              // Adjust the delay as needed (3000 milliseconds = 3 seconds)
                 // window.location.href = window.location.href;
              } else {
                  console.error(data.message);
              }
          } catch (error) {
              console.error(error);
          }
      });
  });
