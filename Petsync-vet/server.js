const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
var app = express();
const helmet=require('helmet');
const nocache=require('nocache');
const dotenv =require('dotenv');
const nodemailer = require("nodemailer");
const pool = require('nodemailer-smtp-pool');
var flash = require("connect-flash");
app.use(helmet());

// Use nocache middleware to disable caching
app.use(nocache());
dotenv.config();
app.use(cors());
const net = require('net');






app.use(express.static(__dirname + "/uploads" ) );


const upload=require('./middleware/multerSetup').single("uploadFile");

app.use('/public', express.static('public'));



 // all statics files in /public
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');


//Database
const conn = require('./config');
 
//SESSION
const session = require('express-session');

app.use(
    session({
      secret: 'your-secret-key', 
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 600000 } // Set session expiration time to 10 minutes (in milliseconds)
    })
  )
module.exports.session = session;
app.use(flash());



const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

const loginRoute=require('./routes/loginRoute');
app.use('/',loginRoute);
const signupRoute=require('./routes/signupRoute');
app.use('/',signupRoute);


const front=require('./routes/frontRoute');
app.use('/',front);

const mainRoute1=require('./routes/mainRoute');
app.use('/',mainRoute1);

const findUser=require('./routes/findUserRoutes');
app.use('/',findUser);

// USER PROFILE ROUTE ADDED HERE
const userProfileRoute=require('./routes/profileRoute');
app.use('/',userProfileRoute);

// USER PROFILE ROUTE ADDED HERE
const createRoute=require('./routes/create');
app.use('/',createRoute);

const galleryRoute=require('./routes/gallery');
app.use('/',galleryRoute);

const animalRoute=require('./routes/animalRoute');
app.use('/',animalRoute);

const profileEditRoute=require('./routes/userSetting');
const { stringify } = require('querystring');
app.use('/profile',profileEditRoute);

const displayAccountRoute=require('./routes/displayAccountRoute');
app.use('/',displayAccountRoute);

const userin=require('./routes/useInRoute');
app.use('/',userin);


//  dummy views
app.get('/pc',(req,res)=>{
  res.render('signup_new');
 });










// this is old codes from fyp1  without mvc   start



//vet register
app.post("/register_vet", function (req, res) {
  var fname = req.body.fname;
  var email = req.body.email;

  var location = req.body.location;
  var lname = req.body.lname;
  var password = req.body.password;

 
  var timeslot = req.body.timeslot;
  var specialization = req.body.specialization;
  var qualification = req.body.qualification;
  var license_number = req.body.license_number;

  var sql = `insert into vet(fname,lname,specialization,qualification,license_number,email,timeslot,password,location) values('${fname}', '${lname}', '${specialization}', '${qualification}', '${license_number}', '${email}','${timeslot}', '${password}','${location}')`;

  conn.query(sql, function (err, results) {
    if (err) throw err;

    res.send("<h1>Data Inserted.</h1>");
  });
});

//

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


const transporter = nodemailer.createTransport(
  pool({
    service: 'gmail',
    auth: {
      user: 'chusmanjutt.129@gmail.com',
      pass: 'vhxp fcjs melv npze',
    },
    maxConnections: 50, // Maximum number of simultaneous connections
    maxMessages: 50,   // Maximum number of messages to send in a single connection
  })
);













app.post("/unique_check_sign_up", function (req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var sql = `SELECT * FROM users WHERE email= '${email}' OR username = '${username}' ORDER BY created_at ASC`;
  conn.query(sql, function (err2, results) {
    if (err2) {
      console.error(err2);
      res.json({ error: 'Database error' });
    } else {
      console.log('Results:', results); // Log the results to inspect them
      var found = false;
      results.forEach(element => {
        if ((email == element.email || username == element.username) && !found) {
          found = true;
        }
      });
      if (found) {
        console.log('User already exists');
        res.json(1); // User already exists
      } else {
        console.log('User does not exist');
        res.json(-1); // User does not exist
      }
    }
  });
});



function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
//ehkb kphm hmpl dilv
//email checking 
app.post('/check-otp', (req, res) => {
  console.log("heyyy i am in");
  const receiver_email = req.body.email;
  //const otp = generateOTP();
  const otp=123;

  // const mailOptions = {
  //   from: 'chusmanjutt.129@gmail.com',
  //   to: receiver_email,
  //   subject: 'Verfication Code',
  //   text: `Your Verification code is : ${otp}`
  // };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.error(error);
  //     res.json({ success: false, message: 'Error sending verification' });
  //   } else {

  //     console.log('Email sent: ' + info.response);
  //     res.send(otp);
  //   }
    


  // });
  res.json(otp);// sending hard code opt

});
// end

//vet

//appointment data api
app.get('/api/appointmentym/:email', (req, res) => {
  const email = req.params.email;
  const yearMonth = req.query.yearMonth; // Get the selected year and month

  let query = 'SELECT * FROM appointment WHERE vet_email = ?';
  const queryParams = [email];

  if (yearMonth) {
    query += ' AND DATE_FORMAT(date, "%Y-%m") = ?';
    queryParams.push(yearMonth);
  }

  conn.query(query, queryParams, (err, result) => {
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


app.post('/approved', (req, res) => {
  console.log('Received a request to /approved');
  const receiver_email = req.body.email;
  const val=req.body.slot;


  const mailOptions = {
    from: 'chusmanjutt.129@gmail.com',
    to: receiver_email,
    subject: 'Your Appointment is Approved!!!',
    text: `You can visit at : ${val}`
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

//vet end

// const host = 'smtp.gmail.com'; // Replace 'example.com' with the hostname or IP address of the server
// const port = 465; // Replace 80 with the port number you want to check

// const checkPort = (host, port) => {
//     const socket = net.connect(port, host, () => {
//         console.log(`Port ${port} on ${host} is open`);
//         socket.destroy(); // Close the socket after the connection is established
//     });

//     socket.on('error', (err) => {
//         console.error(`Error connecting to port ${port} on ${host}: ${err.message}`);
//     });
// };

// checkPort(host, port);


// end 2

//end appoint scheduling user side

//end wothout mvc

app.listen(4001,(err) =>{
    if(err) throw err;
   
    console.log('Server is running on localhost:4001');
});
