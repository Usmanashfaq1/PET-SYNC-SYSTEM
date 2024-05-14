


  
  
    $(document).ready(function () {
      
      $('#party').change(function () {
        var selectedVetType = $(this).val();
        if (selectedVetType) {
          $.ajax({
            url: 'http://localhost:3001/api/vets?type=' + selectedVetType,
            method: 'GET',
            success: function (data) {
              $('#party-details-body').empty();
              if (data && data.length > 0) {
                data.forEach(function (record) {
                  var row = $('<div class="col-md-4 mb-4">');
                  row.html(`
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">${record.fname} ${record.lname}</h5>
                        <p class="card-text">Specialization: ${record.specialization}</p>
                        <p class="card-text">Qualification: ${record.qualification}</p>
                        <p class="card-text">Location: ${record.location}</p>
                        <p class="card-text">Timeslot: ${record.timeslot}</p>
                        <div class="submit__btn text-center mt-25">
                          <button  onclick="bookAppointment('${record.fname}', '${record.lname}', '${record.specialization}', '${record.qualification}', '${record.email}')"  class="btn">Start a Reservation <img src="../public/assets/img/icon/right_arrow.svg" alt="" class="injectable"></button>
                                </div>
                        
                      </div>
                    </div>
                  `);
                  $('#party-details-body').append(row);
                });
              } else {
                $('#party-details-body').append('<p>No vet details found</p>');
              }
            },
            error: function (error) {
              console.error('Error fetching vet details:', error);
              alert('Error fetching vet details. Please try again.');
              $('#party-details-body').empty();
            }
          });
        } else {
          $('#party-details-body').empty();
        }
      });
    });
 
    // <button class="btn btn-primary" onclick="bookAppointment('${record.fname}', '${record.lname}', '${record.specialization}', '${record.qualification}', '${record.email}')">Book</button>
  
    function bookAppointment(fname, lname, specialization, qualification, email) {
      const vetName = `${fname} ${lname}`;
      const vetEmail = `${email}`;
      const storedName1 = localStorage.getItem('name');
      const email1 = localStorage.getItem('email');
      const userName = storedName1;
      var slot = $("#preferredDateTime").val();
      var subject = $("#appointmentReason").val();
      const userEmail = email1;
      var slot12 = new Date($("#preferredDateTime").val());
      var currentDate = new Date();
     var flag=true;
     const form = document.getElementById('asform');
  
      if (slot12 < currentDate) {
        document.getElementById('message').innerText = 'please Choose a valid date';
        showDialog();
        form.reset();
        falg=false;
    
        //showMessage('Do not go in history!', 'warning');
        return;
      }
  
      if (!slot || !subject) {
        document.getElementById('message').innerText = 'please select both Slot and Reason';
        showDialog();
        form.reset();
        flag=false;
        return;

      }

      if(flag===true)
      {

        const appointmentData = {
          user_name: userName,
          user_email: userEmail,
          vet_name: vetName,
          vet_email: vetEmail,
          type: `(${specialization})`,
          slot: slot,
          subject: subject
        };
  
        $.ajax({
          url: 'http://localhost:3001/api/appointments',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(appointmentData),
         success: function (response)
          {
    document.getElementById('message').innerText = response.message;
    showDialog();
},
          error: function (error) {
            console.error('Error booking appointment:', error);
            alert('Error booking appointment. Please try again.');
          }
        });
      }
    
    }

  
  
    // function back() {
    //   window.close("/appointment-scheduling");
    //   window.open("/front");
    // }
  
    function showMessage(message, type) {
      const messageContainer = document.getElementById('message-container');
      const toast = document.createElement('div');
      toast.classList.add('toast', `bg-${type}`, 'text-white');
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'assertive');
      toast.setAttribute('aria-atomic', 'true');
      toast.innerHTML = `
        <div class="toast-header">
          <strong class="mr-auto">Notification</strong>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">${message}</div>
      `;
      messageContainer.appendChild(toast);
      new bootstrap.Toast(toast).show();
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



      $(document).ready(function () {

        const userName = 'done';
const existingValue = localStorage.getItem('as');

if (!existingValue) {
  localStorage.setItem('as', userName);
}

        // Function to periodically check for new appointments
        function checkForNewAppointment() {
          $.ajax({
            url: '/api/check-appointment',
            method: 'GET',
            success: function(response) {
              if (response.success) {
                const newAppointment = response.appointment;
                const appointmentDate = new Date(newAppointment.slot);
                const formattedDate = appointmentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                const formattedTime = appointmentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

                const formattedCreationDate = new Date(newAppointment.date).toLocaleDateString();
                // Format the creation time
                const formattedCreationTime = new Date(newAppointment.date).toLocaleTimeString();

                const message = `Alert ! : Appointment scheduled successfully for ${formattedDate} at ${formattedTime} with ${newAppointment.vet_name} scheduled at ${formattedCreationDate} at ${formattedCreationTime}`;
                document.getElementById('message').innerText = message;
                showDialog();
              } else {
                const message = response.message || 'No new appointment found';
                console.log(message);
              }
            },
            error: function(error) {
              console.error('Error checking for new appointment:', error);
              alert('Error checking for new appointment. Please try again.');
            }
          });
        }
        const as_val = localStorage.getItem('as');
        if(as_val==="done")
          {
            checkForNewAppointment();
            //localStorage.removeItem('as');
          }
    
        // Call the function to check for new appointments every 30 seconds (adjust as needed)
        setInterval(checkForNewAppointment, 30000); // 30 seconds
    });
    
    // Function to display a message
    function showMessage(message, type) {
        // Implement your logic to display the message, e.g., using Bootstrap alerts or a custom dialog box
        // Example:
        document.getElementById('message').innerText = message;
    showDialog(); // You can replace this with your preferred method
    }
    