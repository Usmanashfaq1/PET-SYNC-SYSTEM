
  //

code123=null;
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
    $('#vetr').submit(function (e) {
      e.preventDefault();
      if (validateEmail() == true) {
        return;
      }
      else {
        insert_vet();
      }


    });


  });



  //
  function insert_vet() {
    var fname = $("#fname").val();
    var lname = $("#lname").val();


    var location = $("#location").val();
    var email = $("#email").val();
    var timeslot = $("#timeslot").val();
    var qualification = $("#qualification").val();
    var license_number = $("#license_number").val();

    var specialization = $("#specialization").val();
    var password = $("#password").val();
    var cpassword = $("#cpassword").val();
    var code5 = $("#code").val();

    if (password != cpassword ||code123===null) {
      //alert("Both password and confirm password must be same")
      document.getElementById('message').innerText = 'Both password and confirm password must be same';
            showDialog();
      return;
    }

    if(code5!=code123)
    {
      //alert("Incorrect Verification Code Entered!");
      document.getElementById('message').innerText = 'Verification Code didn\'t matched!';
            showDialog();
      return;
    }

    var data = { fname: fname, lname: lname, specialization: specialization, qualification: qualification, license_number: license_number, email: email,timeslot:timeslot, password: password, location: location };

    let post = JSON.stringify(data);

    console.log(post);

    $.ajax({
      url: 'http://localhost:4001/register_vet',
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      contentType: 'application/json',
      data: post,
      success: function () {
        document.getElementById('message').innerText = 'vet is Registered Successfully!';
            showDialog();

            setTimeout(function () {
    window.location.href="/login_user";

}, 3000);
        
      },
      error: function () {
        alert('error occured');
      }
    });




  }


  //
  var map;

  function initAutocomplete() {

    var map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 30.3753,
        lng: 69.3451
      },
      zoom: 5
    });


    var options = {
      componentRestrictions: { country: "pk" }
    };

    var input = (document.getElementById('location'));
    var autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();

    var marker = new google.maps.Marker({
      draggable: true,
      map: map

    });


    autocomplete.addListener('place_changed', function () {

      var place = autocomplete.getPlace();
      var lattitude = place.geometry.location.lat();
      var longitude = place.geometry.location.lng();

      google.maps.event.addListener(marker, 'dragend', function (event) {
        document.getElementById("lattitude").value = this.getPosition().lat();
        document.getElementById("longitude").value = this.getPosition().lng();

        //Marker Location Changed

        document.getElementById("lattitude").value = this.getPosition().lat();


        document.getElementById("longitude").value = this.getPosition().lng();


      });

      //alert(lattitude + ' ' + longitude);
      document.getElementById("lattitude").value = lattitude;
      document.getElementById("longitude").value = longitude;


      //Selected Place Changed

      //alert("Hello");

      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
        // Why 17? Because it looks good.
      }

      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      var address = '';
      if (place.address_components) {
        address = [(place.address_components[0] && place.address_components[0].short_name || ''), (place.address_components[1] && place.address_components[1].short_name || ''), (place.address_components[2] && place.address_components[2].short_name || '')].join(' ');
      }

      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
      infowindow.open(map, marker);



      // iterate through address_component array



    });



  }



  function muSubFun() {
    var latitude = document.getElementById("lattitude").value;
    var longitude = document.getElementById("longitude").value;
    var input = document.getElementById("location").value;
    //  var roll = document.getElementById("roll-input").value;


    alert(latitude);

    /*	
        $.post("controller.phospital", {
            
            
            lat : 1,
            lon : 2,
            inp : 'kjsdkf afkjdkdajf jkdfakdfkad hkdafhk',
            rol : 3,			
            
            action : 'adddata'
            
        }, function(result) {
        
            
            alert("Datab Added");
            
        });		
        
        */


  }

  //
  function checking_email() {


var email = $("#email").val();
var password = $("#password").val();
var repeat_password = $("#repeat_password").val();

// if (email == '') {
//   alert("Please Fill the Required Fields");
//   return;
// }



var data = { email: email };
let post = JSON.stringify(data);

$.ajax({
  url: 'http://localhost:4001/check-otp',
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
    code123=localStorage.getItem('otp-code');
    //alert(code123);
    if(code123===null)
    {
      
      //alert("Email dont exist this is not a valid gmail account!!!!");
      document.getElementById('message').innerText = 'Email dont exist this is not a valid gmail account!';
            showDialog();
    }
    else{
      document.getElementById('message').innerText = 'Verification Code is Sent, Enter code below!';
            showDialog();
    }
  },
  error: function () {
    alert('error');
  }
});
}

  //







  function showDialog() {
    // if ((loginStatus === "idle") || (loginStatus === "finished"))
    document.getElementById('overlay').style.display = 'flex';
    // console.log('here');
  }

  function closeDialog() {
    document.getElementById('overlay').style.display = 'none';
  }


