// document.getElementById("search-user-form").addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevent the default form submission

//     // Get the value of the input field
//     var username = document.getElementById("search-text").value;

//     // Redirect to the URL with the username as a parameter
//     window.location.href = "/account/" + username;
// });


// $(document).ready(function () {
//     $('#reportUserForm').submit(function (event) {
//         event.preventDefault(); // Prevent default form submission
//         var reportData = $(this).serialize(); // Serialize form data
        
//         var form = this;

//         // AJAX request
//         $.ajax({
//             url: '/report/user/<%= userData.data.id %>', // Replace with your backend API endpoint
//             type: 'POST',
//             data: reportData,
//             success: function (response) {
//                 // Display success message in dialog box
//                 $('#message').text('User reported successfully');
//                 $('#overlay').show();

//                 // Automatically close the dialog box after 3-4 seconds
//             setTimeout(function() {
//                 $('#overlay').hide();
//             }, 3000); // Adjust the delay as needed (3000 milliseconds = 3 seconds)

//             // Clear the form fields
//             form.reset();
//             },
//             error: function (xhr, status, error) {
//                 // Display error message in dialog box
//                 $('#message').text('Error reporting user');
//                 $('#overlay').show();
//             }
//         });
//     });
// });

// function closeDialog() {
//     $('#overlay').hide(); // Close dialog box
// }
// </script>

// // JavaScript to toggle sidebar
// document.addEventListener("DOMContentLoaded", function () {
// const menuToggle = document.getElementById("menu-toggle");
// const sidebar = document.getElementById("sidebar");
// const body = document.body;

// menuToggle.addEventListener("click", function () {
// sidebar.classList.toggle("sidebar-open");
// body.classList.toggle("sidebar-open");
// });
// });
// function openReportModal() {
// document.getElementById('reportUserModal').style.display = 'block';
// }

// function closeReportModal() {
// document.getElementById('reportUserModal').style.display = 'none';
// }

// function openImage(imageSrc) {
// // Create a new element to display the enlarged image
// var enlargedImage = document.createElement('img');
// enlargedImage.src = imageSrc;
// enlargedImage.classList.add('enlarged-image');

// // Append the enlarged image to the body
// document.body.appendChild(enlargedImage);

// // Add an event listener to remove the enlarged image when clicked
// enlargedImage.addEventListener('click', function() {
// document.body.removeChild(enlargedImage);
// });
// }
// </script>