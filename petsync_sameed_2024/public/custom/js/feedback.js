


  
  
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
                            <button  onclick="bookAppointment('${record.fname}', '${record.lname}', '${record.specialization}', '${record.email}')"  class="btn">Submit Feedback <img src="../public/assets/img/icon/right_arrow.svg" alt="" class="injectable"></button>
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
    
      
  
    
      function bookAppointment(fname, lname, specialization, email) {
        const vetName = `${fname} ${lname}`;
        const vetEmail = `${email}`;
        const storedName1 = localStorage.getItem('name');
        const email1 = localStorage.getItem('email');
        const userName = storedName1;
       
        const userEmail = email1;
        
        var currentDate = new Date();
        var feedback = $("select[name='feedback']").val(); // Get the feedback value
    
      
    
        if (!feedback ) { // Check if feedback is selected
            document.getElementById('message').innerText = 'Please select Feedback';
            showDialog();
            return;
        } else {
            const appointmentData = {
                user_name: userName,
                user_email: userEmail,
                vet_name: vetName,
                vet_email: vetEmail,
                type: `(${specialization})`,
                feedback: feedback // Include vet feedback here
            };
    
            $.ajax({
                url: 'http://localhost:3001/api/feedback',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(appointmentData),
                success: function (response) {
                    // console.log('Appointment booked successfully:', response);
                    // alert(`Appointment booked with ${fname} ${lname}, ${specialization}, ${qualification},${email}`);
                    window.location.reload();
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
  