var express = require("express");
var cors = require("cors");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

var app = express();

app.use(cors());

const multer = require("multer");

var mysql = require("mysql");

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pet-sync-database",
});

conn.connect(function (err) {
  if (err) throw err;

  console.log("Connection Sucessful");
});



app.get("/", function (req, res) {
  res.render("insert");
});

app.post("/insert_sign_up", function (req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  var sql = `insert into sign_up(username,email,password,confirm_password) values('${username}', '${email}', '${hash.toString()}', '${hash.toString()}')`;

  conn.query(sql, function (err, results) {
    if (err) throw err;
    else
      res.json(1);
  });
});





app.post("/unique_check_sign_up", function (req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var sql = `SELECT * FROM sign_up WHERE email= '${email}' || username = '${username}'`;
  conn.query(sql, function (err2, results) {
    if (err2) {
      console.error(err2);
    } else {
      var found = false;
      results.forEach(element => {
        if (email == element.email && found == false) {
          found = true;
        }
        else if (username == element.username && found == false) {
          found = true;
        }
      });
      if (found == true) {
        res.json(1);
      }
      else {
        res.json(-1);
      }
    }

  });
});


app.post("/login", function (req, res) {

  var password = req.body.password;
  var email = req.body.email;
  var sql = `SELECT password FROM sign_up WHERE email= '${email}'`;
  conn.query(sql, function (err2, results) {
    if (err2) {
      console.error(err2);
    } else {
      var found = false;
      results.forEach(element => {
        if (bcrypt.compareSync(password.toString(), element.password) && found == false) {
          found = true;
        }
      });
      if (found == true) {
        res.json(1);
      }
      else {
        res.json(-1);
      }
    }

  });
});


app.post("/login_Admin", function (req, res) {

  var password = req.body.password;
  var email = req.body.email;
  var sql = `SELECT password FROM admin_login WHERE email= '${email}'`;
  conn.query(sql, function (err2, results) {
    if (err2) {
      console.error(err2);
    }
    else {
      var found = false;
      results.forEach(element => {
        if ((password == element.password) && found == false) {
          found = true;
        }
      });
      if (found == true) {
        res.json(1);
      }
      else {
        res.json(-1);
      }
    }

  });
});

app.post("/check_user", function (req, res) {

  var password = req.body.password;
  var email = req.body.email;
  var sql = `SELECT email FROM sign_up WHERE email= '${email}'`;
  conn.query(sql, function (err2, results) {
    if (err2) {
      console.error(err2);
    }
    else {
      var found = false;
      results.forEach(element => {
        if ((email == element.email) && found == false) {
          found = true;
        }
      });
      if (found == true) {
        res.json(1);
      }
      else {
        res.json(-1);
      }
    }

  });
});



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'f200116@cfd.nu.edu.pk',
    pass: ''
  }
});

app.post('/recovery-otp', (req, res) => {
  const receiver_email = req.body.email;
  const otp = generateOTP();

  const mailOptions = {
    from: 'f200116@cfd.nu.edu.pk',
    to: receiver_email,
    subject: 'Your OTP',
    text: `Your OTP is: ${otp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.json({ success: false, message: 'Error sending OTP' });
    } else {

      console.log('Email sent: ' + info.response);
      res.send(otp);
    }


  });

});

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}



var server = app.listen(4000, function () {
  console.log("App running on port 4000");
});


