

const conn = require('./config/sqlConnection');

const bcrypt = require('bcrypt');









const express = require('express');
const app = express();
// const productsRouter = require('./routes/route');
const router = require('./routes/route');
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use(express.json());

app.use('/', router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log("Server on start for port: " + PORT))


//app.use('/get_profiles', productsRouter);



app.get('/sign-in', (req, res) => {
    res.render('sign-in');
  });

  app.post("/login", function (req, res) {
    var password = req.body.password;
    var email = req.body.email;
    var sql = `SELECT password,username FROM sign_up WHERE email= '${email}'`;
    conn.query(sql, function (err2, results) {
        if (err2) {
            console.error(err2);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            var found = false;
            results.forEach(element => {
                if (element.password && bcrypt.compareSync(password, element.password) && !found) {
                    found = true;
                    const user = {
                        email: email,
                        name: element.username
                    };
                    res.json(user);
                }
            });

            if (!found) {
                res.json(-1);
            }
        }
    });
});
