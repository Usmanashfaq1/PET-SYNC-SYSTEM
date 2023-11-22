var express = require("express");
var cors = require("cors");
var app = express();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

app.use(express.static('public'));

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
  res.render("front");
});

//
// Define routes to render views
app.get('/admin-dashboard', (req, res) => {
  res.render('admin_dashboard'); 
});


app.get('/front', (req, res) => {
  res.render('front'); 
});

app.get('/admin-sign-in', (req, res) => {
  res.render('admin_sign_in');
});

app.get('/appointment-scheduling', (req, res) => {
  res.render('appointment_scheduling');
});

app.get('/code-reset-page', (req, res) => {
  res.render('code_reset_page');
});

app.get('/forget-code', (req, res) => {
  res.render('forget_code');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/sign-in', (req, res) => {
  res.render('sign-in');
});

app.get('/user-dashboard', (req, res) => {
  res.render('user_dashboard');
});

app.get('/vet-register', (req, res) => {
  res.render('VET_REGISTER'); // Assumes VET_REGISTER.ejs is in the 'views' folder
});

app.get('/vet-sign-in', (req, res) => {
  res.render('vet_sign-in');
});
//

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
      if (found == true) 
      {
       res.json(1);
       
        
      }
      else {
        res.json(-1);
      }
    }

  });
});






//vet sign in





app.post("/login_vet", function (req, res) {

  var password = req.body.password;
  var email = req.body.email;
  var sql = `SELECT password FROM vet WHERE email= '${email}'`;
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


//vet register
app.post("/register_vet", function (req, res) {
  var fname = req.body.fname;
  var email = req.body.email;

  var location = req.body.location;
  var lname = req.body.lname;
  var password = req.body.password;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  var specialization = req.body.specialization;
  var qualification = req.body.qualification;
  var license_number = req.body.license_number;

  var sql = `insert into vet(fname,lname,specialization,qualification,license_number,email,password,location) values('${fname}', '${lname}', '${specialization}', '${qualification}', '${license_number}', '${email}', '${hash}','${location}')`;

  conn.query(sql, function (err, results) {
    if (err) throw err;

    res.send("<h1>Data Inserted.</h1>");
  });
});



//


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

  // var password = req.body.password;
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
    user: '',
    pass: ''
  }
});

app.post('/recovery-otp', (req, res) => {
  const receiver_email = req.body.email;
  const otp = generateOTP();

  const mailOptions = {
    from: '',
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

app.post("/update_password", function (req, res) {

  var password = req.body.password;
  var email = req.body.email;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  var sql = `update sign_up set password = '${hash}' where email  = '${email}'`;
  conn.query(sql, function (err2, results) {
    if (err2) {
      console.error(err2);
    }
    else {

      res.json(1);

    }

  });
});

//vet scheduling api's
//
// Get vet details API
app.get('/api/vets', (req, res) => {
  const vetType = req.query.type;

  if (!vetType) {
    res.status(400).json({ error: 'Vet type not specified' });
    return;
  }

  const query = 'SELECT * FROM vet WHERE specialization = ?';

  conn.query(query, vetType, (err, result) => {
    if (err) {
      console.error('Error fetching vet details:', err);
      res.status(500).json({ error: 'An error occurred while fetching vet details' });
      return;
    }

    if (result.length === 0) {
      res.json(null); // Vet details not found
    } else {
      res.json(result);
    }
  });
});

// making appointment
// API endpoint to insert data into the "appointment" table
app.post('/api/appointments', (req, res) => {
  const { user_name, user_email, vet_name, vet_email, type } = req.body;

  // Insert data into the "appointment" table
  const sql = 'INSERT INTO appointment (user_name, user_email, vet_name, vet_email, type) VALUES (?, ?, ?, ?, ?)';
  const values = [user_name, user_email, vet_name, vet_email, type];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting appointment data:', err);
      res.status(500).json({ error: 'An error occurred while inserting appointment data' });
      return;
    }

    console.log('Appointment data inserted successfully');
    res.json({ success: true });
  });
});


app.post("/add_post", function (req, res) {
  var blog_title = req.body.blog_title;
  var blog_description = req.body.blog_description;

  var sql = `insert into pet_profile values( '${blog_title}', '${blog_description}','')`;

  conn.query(sql, function (err, results) {
    if (err) throw err;

    res.send("<h1>Data Inserted.</h1>");
  });
});

app.post("/get_all_posts", function (req, res) {
  var id = req.body.id;
  var sql = `SELECT * FROM pet_profile`;
  conn.query(sql, function (err2, results) {
      if (err2) {
          console.error(err2);
          res.status(500).send("Error occurred in server");
      } else {
          res.json(results);
          console.log(results);
      }
  });
});


//
var server = app.listen(4000, function () {
  console.log("App running on port 4000");
});


