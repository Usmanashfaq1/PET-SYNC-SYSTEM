
        // Add this script after your existing scripts
        $(document).ready(function () {
          const email = localStorage.getItem('email');
          // Call this function when the document is ready to populate the dropdown
          populateYearMonthDropdown();
        });
        
        function populateYearMonthDropdown() {
          const selectYearMonth = document.getElementById('selectYearMonth');
        
          // Generate options for the previous three months
          for (let i = -3; i < 0; i++) {
            const date = new Date();
            date.setMonth(date.getMonth() + i);
        
            const option = document.createElement('option');
            option.value = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            option.text = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
            selectYearMonth.add(option);
          }
        
          // Generate options for the next 12 months
          for (let i = 0; i < 12; i++) {
            const date = new Date();
            date.setMonth(date.getMonth() + i);
        
            // Check if the generated date is in the future
            if (date >= new Date()) {
              const option = document.createElement('option');
              option.value = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
              option.text = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
              selectYearMonth.add(option);
            }
          }
        
          // Fetch appointments when the page loads
          fetchAppointmentsByYearMonth();
        }
function fetchAppointmentsByYearMonth() {
  const selectedYearMonth = document.getElementById('selectYearMonth').value;
  const email = localStorage.getItem('email');

  $.ajax({
    url: `http://localhost:4001/api/appointmentym/${email}?yearMonth=${selectedYearMonth}`,
    method: 'GET',
    success: function (data) {
      // The rest of your existing code to populate the table with fetched data
      // ...success: function (data) {
              // Clear existing table rows
              $('#party-details-body').empty();
              // Append vet details to table
              if (data && data.length > 0) {
                data.forEach(function (record) {
                  var row = $('<tr>');
                  row.html(`
                  <td>${formatDate(record.date)}</td>
                    <td>${record.user_name}</td>

                    <td>${record.user_email}</td>
                    <td>${record.type}</td>
                    <td>${formatDateWithTime(record.slot)}</td>
                    <td>${record.subject}</td>
                    <td>${record.status}</td>

                    <td><button class="btn btn-primary" onclick="bookAppointment(' ${record.id}','${record.status}','${record.user_email}','${formatDateWithTime(record.slot)}')">Approve</button></td>
                  `);
                  $('#party-details-body').append(row);
                });
              } else {
                // Vet details not found
                $('#party-details-body').append('<tr><td colspan="5">No appointment details found</td></tr>');
              }
            
    },
    error: function (error) {
      console.error('Error fetching vet details:', error);
      document.getElementById('message').innerText = 'Error fetching vet details';
            showDialog();
      $('#party-details-body').empty();
    }
  });
}

      
      


        




        // added approved appointment function (feature to approved appointment and set its status to approved)
        function bookAppointment(id,status,user_email,slot1) 
         {
          const appointmentId = id;
         if(status==='approved')
         {
          document.getElementById('message').innerText = 'Appointment Already Approved!';
            showDialog();
          return;

         }
        // AJAX call to the server-side API
        $.ajax({
          type: 'PUT',
          url: `/updateAppointmentStatus/${appointmentId}`,
          success: function(response) {
            console.log(response);
            // Handle success, e.g., show a success message to the user
            //alert('Appointment status updated to approved!');

            // email sending to user
            var email = user_email;
            var slot=slot1;
            handleEmailSending(user_email, slot1);
            //alert(slot);
            document.getElementById('message').innerText = 'Email sent to client!';
            showDialog();
      
           // Wait for 5 seconds (5000 milliseconds) before refreshing the window
           setTimeout(function () {
    window.location.href="/manage_appointment";
   

}, 5000);
          },
          error: function(error) {
            console.error(error);
            // Handle error, e.g., show an error message to the user
            document.getElementById('message').innerText = 'Error updating appointment status!!';
            showDialog();
          }
        });
        
      }

      
      
function handleEmailSending(email, slot) {
 // alert('Before email sending to user');
  var data = { email: email, slot: slot };
  let post = JSON.stringify(data);

  $.ajax({
    url: 'http://localhost:4001/approved',
    headers: {
      'Content-Type': 'application/json'
    },
    type: 'POST',
    contentType: 'application/json',
    data: post,
    success: function (data) {
     
    },
    error: function () {
      document.getElementById('message').innerText = 'Error Sending email, network error!!!';
            showDialog();
    }
  });

  //alert('After email sending to user');
}
        // made a new logic of back function to destroy current session of user and window and take back to front page without browser chache and back+forward buttons
        // function back() {

        //   window.close("/manage_appointment");
        //   window.open("/front");
        // }

        function formatDateWithTime(dateString) {
          const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true  // Set to false for 24-hour format
          };
          const date = new Date(dateString);
          return date.toLocaleDateString(undefined, options);
        }

        function formatDate(dateString) {
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          const date = new Date(dateString);
          return date.toLocaleDateString(undefined, options);
        }

        //

        function approved() {

        }
      

      

      
      
        // Function to show the dialog box
        function showDialog() {
          document.getElementById('overlay').style.display = 'flex';
        }

        // Function to close the dialog box
        function closeDialog() {
          document.getElementById('overlay').style.display = 'none';
        }

        // Check your condition here and call showDialog() if the condition is met
        // For example, let's assume the condition is a variable named "isConditionMet"

      

        
      
    