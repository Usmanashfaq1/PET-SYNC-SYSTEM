document.getElementById('login').addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = new FormData(this);
    var jsonData = {};

    Array.from(formData.entries()).forEach(([key, value]) => {
        jsonData[key] = value;
    });

    fetch('/login_E', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData),
    })
        .then(response => response.json())
        .then(data => {
            if (data.email) {
                localStorage.setItem('email_e', data.email);
                localStorage.setItem('name', data.name);
                window.location.href = "/Load_shop_page";
            } else {
                document.getElementById('message').innerText = 'Login Failed! Incorrect Email or Password!';
                showDialog_donot_reload();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').innerText = 'Internal failure at backend!';
            showDialog();
        });
});
