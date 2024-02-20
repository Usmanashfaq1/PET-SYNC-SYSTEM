const connection = require('../../config');

handle_E_commerce_login = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var sql = `SELECT email ,username, password FROM users WHERE username = '${username}'`;
    connection.query(sql, function (err2, results) {
        if (err2) {
            console.error(err2);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            var found = false;
            results.forEach(element => {
                if ((element.password == password) && !found) {
                    found = true;
                    const user = {
                        email: element.email,
                        name: element.username
                    };
                    console.log(user);
                    res.json(user);
                }
            });
            if (!found) {
                res.json(-1);
            }
        }
    });
}

module.exports = {
    handle_E_commerce_login,
}
