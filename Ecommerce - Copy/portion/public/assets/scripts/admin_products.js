document.getElementById("product").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
   add_product();
  });

//api
function add_product() {
    

    var pname = $("#pname").val();
    var category = $("#category").val();
    var price = $("#price").val();
    var stock = $("#stock").val();
    var rating = $("#rating").val();
    var description = $("#description").val();
    var productPicture = document.getElementById('productPicture').files[0];

    alert("jdf");
    // add dialog box if you want sameed


    // if (code5 != code123) {
    //   //alert("Incorrect Verification Code Entered!");
    //   document.getElementById('message').innerText = 'Verification Code didn\'t matched!';
    //   showDialog();
    //   return;
    // }

    var data = { pname: pname, category: category, price: price, stock: stock, rating: rating, description: description, productPicture: productPicture };

    let post = JSON.stringify(data);

    console.log(post);

    $.ajax({
        url: 'http://localhost:4000/add_product',
        headers: {
            'Content-Type': 'application/json'
        },
        type: 'POST',
        contentType: 'application/json',
        data: post,
        success: function () {
            // document.getElementById('message').innerText = 'Product is Added Successfully!';
            // showDialog();
            alert("inserted");

        },
        error: function () {
            alert('error occured');
        }
    });




}

