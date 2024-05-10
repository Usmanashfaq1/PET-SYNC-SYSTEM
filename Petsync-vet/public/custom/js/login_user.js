


    // $("#email").on("input", function () {

    // });



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





    function login() {
      var password = $("#password").val();
      var email = $("#email").val();

      var data = { email: email, password: password };
      let post = JSON.stringify(data);

      $.ajax({
        url: '/login_user',
        headers: {
          'Content-Type': 'application/json'
        },
        type: 'POST',
        contentType: 'application/json',
        data: post,
        success: function (data) {
          var email = data;
          if (email !== -1) {
            var email = data.email;
            var name = data.name;
            localStorage.setItem('email', email);
            localStorage.setItem('name', name);
            // Set login status to finished
            // Updated logic
           
           window.location.href="/user_dashboard";
          } else {

            document.getElementById('message').innerText = 'Login Failed! Incorrect Email or Password!';
            showDialog();
          }
        },
        error: function () {
          alert('error');
          // Set login status back to idle on error
        }
      });
    }





  

  


    function showDialog() {
      // if ((loginStatus === "idle") || (loginStatus === "finished"))
      document.getElementById('overlay').style.display = 'flex';
      // console.log('here');
    }

    function closeDialog() {
      document.getElementById('overlay').style.display = 'none';
    }


  