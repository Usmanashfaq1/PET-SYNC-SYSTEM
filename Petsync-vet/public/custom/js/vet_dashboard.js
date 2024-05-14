$(document).ready(function () {
  // Get the value of email and name from the query parameters
  const params = new URLSearchParams(window.location.search);
  const email1 = params.get('email');
  const name1 = params.get('name');

  // Check if email1 and name1 are not empty before setting local storage
  if (email1 && name1) {
      localStorage.setItem('email', email1);
      localStorage.setItem('name', name1);
  }

  const name = localStorage.getItem('name');
  
  // Display the name in the h4 tag
  const namePlaceholder = document.getElementById('namePlaceholder');
  namePlaceholder.textContent = `Welcome ${name}`;

  const email = localStorage.getItem('email');
  // Update the href attribute of the email link
  if (email) {
      $('#email-link').attr('href', 'mailto:' + email).text(email);
  }
});
