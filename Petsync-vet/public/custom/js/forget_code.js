

  function validateEmail() {
    var emailInput = $("#email");
    var emailError = $("#email-error");
    var email = emailInput.val();
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailRegex)) {
      emailInput.removeClass("is-valid").addClass("is-invalid");
      emailError.text('Email is not valid');
      return true;
    } else {
      emailInput.removeClass("is-invalid").addClass("is-valid");
      emailError.text('');
      return false;
    }
  }


  $(document).ready(function () {
    $('#forget_code').submit(function (e) {
      e.preventDefault();
      if (validateEmail() == true) {
        return;
      }
      else {
        check_user();
      }
    });

  });

  function check_user() {
    var email = $("#email").val();
    var data = { email: email };
    let post = JSON.stringify(data);
    $.ajax({
      url: 'http://localhost:4001/check_user',
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      contentType: 'application/json',
      data: post,
      success: function (data) {
        if (data == 1) {
          otp();


        }

        else {
          document.getElementById('message').innerText = 'Email not found!';
          showDialog();
        }

      },
      error: function () {
        alert('error');
      }
    });
  }

  function otp() {
    var email = $("#email").val();
    // if (email == '' || password == '') {
    //   alert("Please Fill the Required Fields");
    //   return;
    // }
    var data = { email: email };
    let post = JSON.stringify(data);
    $.ajax({
      url: 'http://localhost:4001/recovery-otp',
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      contentType: 'application/json',
      data: post,
      success: function (data) {
        var otp = data;
        localStorage.setItem('otp-code', otp);
        localStorage.setItem('email', email);
        var newPageUrl = '/code-reset-page'; // Replace this with the actual filename
        window.location.href = newPageUrl;
      },
      error: function () {
        alert('error');
      }
    });
  }

