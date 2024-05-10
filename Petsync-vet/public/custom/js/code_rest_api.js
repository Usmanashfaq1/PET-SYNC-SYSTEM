

  $(document).ready(function () {
    $('#forget_code').submit(function (e) {
      e.preventDefault();
      const otp = localStorage.getItem('otp-code');
      if (otp === document.getElementById('code').value) {
        updatePassword();
      }
      else {
        document.getElementById('message').innerText = "Verification Code not correct!";

          showDialog();
      }

    });

  });

  function backtosignin() {
    var newPageUrl = '/pc';
    window.location.href = newPageUrl;
  }

  function updatePassword() {
    var password = $("#pcode").val();
    var email = localStorage.getItem('email');
    // if (email == '' || password == '') {
    //   alert("Please Fill the Required Fields");
    //   return;
    // }
    var data = { email: email, password: password };
    let post = JSON.stringify(data);
    $.ajax({
      url: 'http://localhost:4001/update_password',
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      contentType: 'application/json',
      data: post,
      success: function (data) {
        if (data == 1) {
          window.location.href = '/login_user';
        }
        else {
          document.getElementById('message').innerText = "Updation Failed";

          showDialog();
          
        }

      },
      error: function () {
        alert('error');
      }
    });
  }



  // Function to show the dialog box
  function showDialog() {
      document.getElementById('overlay').style.display = 'flex';
  }

  // Function to close the dialog box
  function closeDialog() {
      document.getElementById('overlay').style.display = 'none';
  }

  

