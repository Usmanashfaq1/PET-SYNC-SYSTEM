const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
var app = express();
const dotenv =require('dotenv');
const nodemailer = require("nodemailer");
const pool = require('nodemailer-smtp-pool');
var flash = require("connect-flash");
dotenv.config();
app.use(cors());






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

const appointment=require('./routes/appointment_schedulingRoute');
app.use('/',appointment);


const report=require('./routes/reportRoute');
app.use('/',report);



app.get('/community',(req,res)=>{
  res.render('community');
 });


//  dummy views
 app.get('/pc',(req,res)=>{
  res.render('signup_new');
 });

 app.get('/cp',(req,res)=>{
  res.render('settingnew');
 });

// end dummy views


 //E-commerce
// const productsRouter = require('./routes/route');
const router = require('./routes/route');

app.use('/', router);





// this is old codes from fyp1  without mvc   start

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





app.post("/insert_sign_up", function (req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  // const salt = bcrypt.genSaltSync(10);
  // const hash = bcrypt.hashSync(password, salt);
  var sql = `insert into users(username,email,password) values('${username}', '${email}', '${password}')`;

  conn.query(sql, function (err, results) {
    if (err) throw err;
    else
      res.json(1);
  });
  conn.query('SELECT * FROM users WHERE username = ?',username,(error,result,feild)=>{
    if(error){
        res.send({
            "code":400,
            "failed":"error ocurred"
          })
    }
    else{
    //console.log(result);
    var userData = {
        "id":result[0].id,
        "username":username,
        "profilepic":null,
        "fullname":null,
        "birthdate":null,
        "bio":null
    };
    //console.log(userData);
    //res.send(userData.profilepic);
    conn.query('INSERT INTO userinfo SET ?',userData);
    
    }
});
});





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
  const otp = generateOTP();

  const mailOptions = {
    from: 'chusmanjutt.129@gmail.com',
    to: receiver_email,
    subject: 'Verfication Code',
    text: `Your Verification code is : ${otp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.json({ success: false, message: 'Error sending verification' });
    } else {

      console.log('Email sent: ' + info.response);
      res.send(otp);
    }


  });

});
// end

// here appointment scheduling api user side: 
//start
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

// this is appointment scheduling api 
app.post('/api/appointments', (req, res) => {
  console.log('Received appointment request:', req.body);

  const { user_name, user_email, vet_name, vet_email, type, slot, subject } = req.body;
  const date = new Date();
  const status = 'unapproved';

  // Get user_id based on user_name and user_email
  const getUserQuery = 'SELECT id FROM users WHERE username = ? AND email = ? LIMIT 1';
  const userValues = [user_name, user_email];

  conn.query(getUserQuery, userValues, (err, userResult) => {
    if (err) {
      console.error('Error querying user data:', err);
      res.status(500).json({ error: 'An error occurred while querying user data' });
      return;
    }

    if (userResult.length === 0) {
      // User not found, handle accordingly
      console.log('User not found:', user_name, user_email);
      res.status(400).json({ error: 'User not found' });
      return;
    }

    const user_id = userResult[0].id;
    console.log('User ID:', user_id);

    // Get vet_id based on vet_name and vet_email
    const getVetQuery = 'SELECT id FROM vet WHERE  email = ? LIMIT 1';
    const vetValues = [vet_email];

    conn.query(getVetQuery, vetValues, (err, vetResult) => {
      if (err) {
        console.error('Error querying vet data:', err);
        res.status(500).json({ error: 'An error occurred while querying vet data' });
        return;
      }

      if (vetResult.length === 0) {
        // Vet not found, handle accordingly
        console.log('Vet not found:', vet_name, vet_email);
        res.status(400).json({ error: 'Vet not found' });
        return;
      }

      const vet_id = vetResult[0].id;
      console.log('Vet ID:', vet_id);

      // Insert appointment data with obtained user_id and vet_id
      const insertAppointmentQuery = 'INSERT INTO appointment (date,user_name,user_email,vet_name,vet_email, user_id, vet_id, type, slot, subject, status) VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?,?)';
      const appointmentValues = [date,user_name,user_email,vet_name,vet_email, user_id, vet_id, type, slot, subject, status];

      conn.query(insertAppointmentQuery, appointmentValues, (err, result) => {
        if (err) {
          console.error('Error inserting appointment data:', err);
          res.status(500).json({ error: 'An error occurred while inserting appointment data' });
          return;
        }

        console.log('Appointment data inserted successfully');
        res.json({ success: true });
      });
    });
  });
});




// end 2

//end appoint scheduling user side

//end wothout mvc

app.listen(3001,(err) =>{
    if(err) throw err;
   
    console.log('Server is running on localhost:3001');
});
