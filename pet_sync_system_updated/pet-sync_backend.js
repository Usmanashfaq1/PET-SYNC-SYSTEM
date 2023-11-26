var express = require("express");
var cors = require("cors");
var app = express();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const storage = require('node-sessionstorage');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

app.use(express.static('public'));

app.use(cors());

const multer = require("multer");
//const multer_storage = multer.memoryStorage(); // Use memory storage for simplicity


var mysql = require("mysql");

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pet-sync-database1",
});

conn.connect(function (err) {
  if (err) throw err;

  console.log("Connection Sucessful");
});


const multer_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'upload');
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: multer_storage });


app.post('/create_pet_profile', upload.single('petPicture'), (req, res) => {
  var gender = req.body.gender;
  var age = req.body.age;
  var breed = req.body.breed;
  var username = req.body.username;
  var weight = req.body.weight
  var color=req.body.color;
  var petname=req.body.petname;
  var species=req.body.species;
  var about=req.body.about;
  const petPicture = req.file.filename;
  var sql = `insert into pet_profile(pet_owner,petname,gender,age,breed , species,weight,color, petPicture, about) values('${username}', '${petname}', '${gender}', '${age}', '${breed}' , '${species}', '${weight}', '${color}', '${petPicture}', '${about}')`;

  conn.query(sql, function (err, results) {
    if (err) throw err;
    else
      res.json(1);
  });
});

app.get('/get_profiles/:username', (req, res) => {
  const username = req.params.username;
  const sql = `SELECT * FROM pet_profile WHERE pet_owner = '${username}'`;

  conn.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching pet profiles:', err);
      res.status(500).json({ error: 'An error occurred while fetching pet profiles' });
      return;
    }


    const fileContents = [];

    // Assuming 'petPicture' is the column name
    result.forEach(row => {
      const fileName = row.petPicture;

      // Check if fileName is defined
      if (fileName) {
        const filePath = path.join(__dirname, 'upload', fileName);

        try {
          // Read the file content in base64
          const content = fs.readFileSync(filePath, { encoding: 'base64' });

          // Include all values from the result set along with the file content
          const rowWithFileContent = { ...row, petPicture: content };
          fileContents.push(rowWithFileContent);
        } catch (err) {
          console.error('Error reading file:', err);
        }
      }
    });

    // Send the array of result and file contents as a response
    res.json(fileContents);
  });
});

app.get('/open_profile/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM pet_profile WHERE id = '${id}'`;

  conn.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching pet profiles:', err);
      res.status(500).json({ error: 'An error occurred while fetching pet profiles' });
      return;
    }


    const fileContents = [];

    // Assuming 'petPicture' is the column name
    result.forEach(row => {
      const fileName = row.petPicture;

      // Check if fileName is defined
      if (fileName) {
        const filePath = path.join(__dirname, 'upload', fileName);

        try {
          // Read the file content in base64
          const content = fs.readFileSync(filePath, { encoding: 'base64' });

          // Include all values from the result set along with the file content
          const rowWithFileContent = { ...row, petPicture: content };
          fileContents.push(rowWithFileContent);
        } catch (err) {
          console.error('Error reading file:', err);
        }
      }
    });

    // Send the array of result and file contents as a response
    res.json(fileContents);
  });
});


app.get('/edit_open_profile/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM pet_profile WHERE id = '${id}'`;

  conn.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching pet profiles:', err);
      res.status(500).json({ error: 'An error occurred while fetching pet profiles' });
      return;
    }


    const fileContents = [];

    // Assuming 'petPicture' is the column name
    result.forEach(row => {
      const fileName = row.petPicture;

      // Check if fileName is defined
      if (fileName) {
        const filePath = path.join(__dirname, 'upload', fileName);

        try {
          // Read the file content in base64
          const content = fs.readFileSync(filePath, { encoding: 'base64' });

          // Include all values from the result set along with the file content
          const rowWithFileContent = { ...row, petPicture: content };
          fileContents.push(rowWithFileContent);
        } catch (err) {
          console.error('Error reading file:', err);
        }
      }
    });

    // Send the array of result and file contents as a response
    res.json(fileContents);
  });
});

app.get("/", function (req, res) {
  res.render("front");
});


//app.get("/", function (req, res) {
//res.render("front");
//});

//
// Define routes to render views
app.get('/admin-dashboard', (req, res) => {
  res.render('admin_dashboard');
});

app.get('/edit-profile', (req, res) => {
  res.render('edit_profile');
});

app.get('/view-profile', (req, res) => {
  res.render('view_pet_profile');
});

app.get('/pet-profile', (req, res) => {
  res.render('pet_profile_page');
});

app.get('/approved-app', (req, res) => {
  res.render('approved_appointment');
});

app.get('/create-pet-profile', (req, res) => {
  res.render('create_pet_profile');
});

app.get('/create-pet-profile-new', (req, res) => {
  res.render('create_pet_profile_new');
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

app.get('/manage_appointment', (req, res) => {
  res.render('manage_appointment');
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

app.get('/vet-dashboard', (req, res) => {
  res.render('vet_dashboard');
});

app.get('/vet-register', (req, res) => {
  res.render('VET_REGISTER'); // Assumes VET_REGISTER.ejs is in the 'views' folder
});

app.get('/vet-sign-in', (req, res) => {
  res.render('vet_sign-in');
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
  var sql = `SELECT password,username FROM sign_up WHERE email= '${email}'`;
  conn.query(sql, function (err2, results) {
    if (err2) {
      console.error(err2);
    } else {
      var found = false;
      results.forEach(element => {
        if (bcrypt.compareSync(password.toString(), element.password) && found == false) {
          found = true;
          const user = {
            email: email,
            name: element.username
          };

          res.json(user);
        }
      });
      if (found == true) {
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
        // Valid credentials
        // req.session.vetEmail = email;
        //storage.setItem("email",email);
        //console.log(storage.getItem("email"));
        //window.sessionStorage.setItem("name","usman");
        res.json(email);

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
var timeslot=req.body.timeslot;
  var specialization = req.body.specialization;
  var qualification = req.body.qualification;
  var license_number = req.body.license_number;

  var sql = `insert into vet(fname,lname,specialization,qualification,license_number,email,timeslot,password,location) values('${fname}', '${lname}', '${specialization}', '${qualification}', '${license_number}', '${email}','${timeslot}', '${hash}','${location}')`;

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
        //req.session.user = user.email;
        res.json(1);

      }
      else {
        res.json(-1);
      }
    }

  });
});

app.post("/check_user", function (req, res) {

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
    pass: 'ms@1234567.'
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
//insert data
app.post('/api/appointments', (req, res) => {
  const { user_name, user_email, vet_name, vet_email, type,slot,subject } = req.body;
  const date = new Date();
  const status='unapproved';
  // Insert data into the "appointment" table
  const sql = 'INSERT INTO appointment (date,user_name, user_email, vet_name, vet_email, type,slot,subject,status) VALUES (?, ?, ?, ?, ?,?,?,?,?)';
  const values = [date,user_name, user_email, vet_name, vet_email, type,slot,subject,status];

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
//
//appointment data api
// app.get('/api/appointment', (req, res) => {
//   conn.query('SELECT * FROM appointment', (err, results) => {
//     if (err) {
//       console.error('Error fetching  data:', err);
//       res.status(500).json({ error: 'An error occurred while fetching  data' });
//       return;
//     }

//     res.json(results);
//   });
// });
//
// Get appointment  details API with specfic to current user session email

app.get('/api/appointment/:email', (req, res) => {
  const email = req.params.email; //here taking email from ajax frontend
  conn.query('SELECT * FROM appointment WHERE vet_email = ?', email, (err, result) => { //here matching data and fetching it
    if (err) {
      console.error('Error fetching party details:', err);
      res.status(500).json({ error: 'An error occurred while fetching party details' });
      return;
    }

    if (result.length === 0) {
      res.json(null); // Party details not found
    } else {
      res.json(result);
    }
  });
});

//
app.get('/api/appointmentapp/:email', (req, res) => {
  const email = req.params.email; // Taking email from the AJAX frontend

  // Query the database to fetch appointments for the specified vet
  conn.query('SELECT * FROM appointment WHERE user_email = ? AND status = ?', [email, 'approved'], (err, result) => {
    if (err) {
      console.error('Error fetching appointment details:', err);
      res.status(500).json({ error: 'An error occurred while fetching appointment details' });
      return;
    }

    if (result.length === 0) {
      res.json(null); // No appointments found for the specified vet
    } else {
      res.json(result);
    }
  });
});





//

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


const secretKey = 'usman_jutt_58';

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true
  })
);





// Logout endpoint
app.get('/logout', (req, res) => {
  // Perform logout actions
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    // Redirect to the login page or any other logged-out state
    res.redirect('/sign-in');
  });
});


//approved appointment
// Define the API endpoint to update the status to "approved"
app.put('/updateAppointmentStatus/:appointmentId', (req, res) => {
  const appointmentId = req.params.appointmentId;

  // Update the status to "approved"
  const sql = 'UPDATE appointment SET status = ? WHERE id = ?';
  conn.query(sql, ['approved', appointmentId], (err, result) => {
    if (err) {
      console.error('Error updating status:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Status updated successfully');
      res.status(200).send('Status updated to approved');
    }
  });
});


var server = app.listen(4000, function () {
  console.log("App running on port 4000");
});


