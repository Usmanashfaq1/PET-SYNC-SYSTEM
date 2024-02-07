const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
var app = express();
const dotenv =require('dotenv');
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
const connection = require('./config');
 
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

const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

const loginRoute=require('./routes/loginRoute');
app.use('/',loginRoute);
const signupRoute=require('./routes/signupRoute');
app.use('/',signupRoute);




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

const profileEditRoute=require('./routes/userSetting');
const { stringify } = require('querystring');
app.use('/profile',profileEditRoute);

const displayAccountRoute=require('./routes/displayAccountRoute');
app.use('/',displayAccountRoute);

app.listen(3001,(err) =>{
    if(err) throw err;
   
    console.log('Server is running on localhost:3001');
});