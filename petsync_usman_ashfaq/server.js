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


//end wothout mvc

app.listen(3001,(err) =>{
    if(err) throw err;
   
    console.log('Server is running on localhost:3001');
});
