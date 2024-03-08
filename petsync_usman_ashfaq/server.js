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
// Use helmet with CSP configuration
// Use helmet with CSP configuration
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrcAttr: ["'unsafe-inline'"],
      // Add other directives as needed
    },
  })
);

// Use nocache middleware to disable caching
app.use(nocache());
dotenv.config();
app.use(cors());
const { isUserAuthenticated } = require('./middleware/authMiddleware');
const multer = require("multer");
const multer_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'upload');
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: multer_storage }); //old fyp1







app.use(express.static(__dirname + "/uploads" ) );


//const upload=require('./middleware/multerSetup').single("uploadFile"); // commented latests 

app.use('/public', express.static('public'));



 // all statics files in /public
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');


//Database
const conn = require('./config');

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


const userRequestRoutes = require('./routes/userRequestRoutes');
app.use('/', userRequestRoutes);

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
  var sql = `SELECT email FROM users WHERE email= '${email}'`;
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





app.post("/insert_users", function (req, res) {
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





app.post("/unique_check_users", function (req, res) {
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

// minahil ali feeding schedule api 
//start
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database successfully!');
});

// Handle database connection errors
connection.on('error', (err) => {
    console.error('Database connection error:', err);
});


// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
// Serve static files in the 'public' directory
app.use(express.static('public'));

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Route handler for the root URL
// Route handler for the root URL
app.get('/feed',isUserAuthenticated , (req, res) => {
  const userEmail = req.query.email; // Retrieve the email from the query string

  // Fetching pets belonging to the user with the given email
  connection.query('SELECT * FROM pet_profile JOIN users ON pet_profile.owner_id = users.id WHERE users.email = ?', [userEmail], (error, pets) => {
      if (error) {
          console.error('Error fetching pets:', error);
          res.status(500).send('Error fetching pets.');
          return;
      }
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      res.render('view', { pets: pets, days: days });
  });
});

// Route to view all schedule details
app.get('/view-schedule',isUserAuthenticated ,(req, res) => {
    connection.query('SELECT * FROM pet_schedule', (error, scheduleDetails) => {
        if (error) {
            console.error('Error fetching schedule details:', error);
            res.status(500).send('Error fetching schedule details.');
            return;
        }
        res.render('view-schedule', { scheduleDetails: scheduleDetails });
    });
});

// Route to render the edit schedule page for a specific schedule detail
app.get('/edit-schedule/:id', (req, res) => {
  const scheduleId = req.params.id;
  connection.query('SELECT * FROM pet_schedule WHERE id = ?', scheduleId, (error, results) => {
      if (error) {
          console.error('Error fetching schedule detail:', error);
          res.status(500).send('Error fetching schedule detail.');
          return;
      }
      
      // Extract the schedule detail from the results
      const scheduleDetail = results[0]; // Assuming only one schedule detail is returned
      
      // Render the edit-schedule template with the scheduleDetail data
      res.render('edit-schedule', { scheduleDetail: scheduleDetail });
  });
});


// Route to update a schedule detail
app.post('/update-schedule/:id', (req, res) => {
    const scheduleId = req.params.id;
    const updatedSchedule = req.body;
    connection.query('UPDATE pet_schedule SET ? WHERE id = ?', [updatedSchedule, scheduleId], (error, result) => {
        if (error) {
            console.error('Error updating schedule detail:', error);
            res.status(500).send('Error updating schedule detail.');
            return;
        }
        console.log('Schedule detail updated successfully.');
        res.redirect('/view-schedule');
    });
});

// Route to delete a schedule detail
app.post('/delete-schedule/:id', (req, res) => {
    const scheduleId = req.params.id;
    connection.query('DELETE FROM pet_schedule WHERE id = ?', scheduleId, (error, result) => {
        if (error) {
            console.error('Error deleting schedule detail:', error);
            res.status(500).send('Error deleting schedule detail.');
            return;
        }
        console.log('Schedule detail deleted successfully.');
        res.redirect('/view-schedule');
    });
});

// Route to render the feeding schedule page
app.get('/feeding-schedule', (req, res) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    connection.query('SELECT * FROM pet_profile', (error, pets) => {
        if (error) {
            console.error('Error fetching pets:', error);
            res.status(500).send('Error fetching pets.');
            return;
        }
        res.render('view', { pets: pets, days: days });
    });
});


// Route to save the feeding schedule data
app.post('/save-schedule', (req, res) => {
    const scheduleData = req.body;
    const sql = 'INSERT INTO pet_schedule (pet_id, day_of_week, meal_name, portion_size) VALUES ?';
    const values = scheduleData.map(schedule => [
        schedule.pet_id, 
        schedule.day_of_week, 
        schedule.meal_name, 
        schedule.portion_size
    ]);

    connection.query(sql, [values], (error, results) => {
        if (error) {
            console.error('Error saving schedule:', error);
            res.status(500).send('Error saving schedule.');
            return;
        }
        console.log('Feeding schedule saved successfully.');
        res.sendStatus(200);
    });
});

// Route handler for the feedback page
app.get('/feedback', (req, res) => {
    res.render('feedback'); // Assuming you have a feedback.ejs file in your views folder
});

app.post('/submit-feedback', (req, res) => {
    const { name, email, website, message } = req.body;

    const feedbackData = {
        name: name,
        email: email,
        website: website,
        message: message
    };

    const sql = 'INSERT INTO feedback SET ?';

    connection.query(sql, feedbackData, (error, results) => {
        if (error) {
            console.error('Error saving feedback:', error);
            res.status(500).send('Error saving feedback.');
            return;
        }
        console.log('Feedback saved successfully.');
        res.sendStatus(200);
    });
});




// end of minahil ali feeding schedule


//sameed e-comerce start
app.get('/login_E',(req,res)=>{
  res.render('login_E');
 });

 app.get('/our-shop',(req,res)=>{
  res.render('our-shop');
 });

 app.get('/product-details',(req,res)=>{
  res.render('product-details');
 });


 app.get('/item_cart',(req,res)=>{
  res.render('item_cart');
 });

//ens

//fyp1
// pet profile apis
app.post('/create_pet_profile', upload.single('petPicture'), (req, res) => {
  var gender = req.body.gender;
  var age = req.body.age;
  var breed = req.body.breed;
  var username = req.body.username;
  var weight = req.body.weight
  var color = req.body.color;
  var petname = req.body.petname;
  var species = req.body.species;
  var about = req.body.about;
  const petPicture = req.file.filename;
 // Assuming 'owner_id' is the foreign key column in 'pet_profile'
 var sql = `INSERT INTO pet_profile (pet_owner, petname, gender, age, breed, species, weight, color, petPicture, about, owner_id) 
 VALUES ('${username}', '${petname}', '${gender}', '${age}', '${breed}', '${species}', '${weight}', '${color}', '${petPicture}', '${about}', 
         (SELECT id FROM users WHERE username = '${username}'))`;

  conn.query(sql, function (err, results) {
    if (err) throw err;
    else
      res.json(1);
  });
});

// create pet post (memory post)
// add post api updated
app.post('/create_pet_profile_post', upload.single('petPicture'), (req, res) => {

  var username = req.body.username;

  var petname = req.body.petname;

  var about = req.body.about;
  const petPicture = req.file.filename;
  const date = new Date();
  var sql = `insert into pet_memories(date,pet_owner,petname,about,petPicture) values('${date}','${username}', '${petname}',  '${about}', '${petPicture}')`;

  conn.query(sql, function (err, results) {
    if (err) throw err;
    else
      res.json(1);
  });
});

//
//



app.post('/edit_pet_profile_no_pic/:id', (req, res) => {
  const id = req.params.id;
  var gender = req.body.gender;
  console.log(gender);
  var age = req.body.age;
  var breed = req.body.breed;
  var weight = req.body.weight;
  var color = req.body.color;
  var petname = req.body.petname;
  var species = req.body.species;
  var about = req.body.about;

  // Constructing the update query
  var sql = `UPDATE pet_profile 
             SET gender = '${gender}', 
                 age = '${age}', 
                 breed = '${breed}', 
                 weight = '${weight}', 
                 color = '${color}', 
                 petname = '${petname}', 
                 species = '${species}', 
                 about = '${about}' 
             WHERE id = ${id}`;

  conn.query(sql, function (err, results) {
    if (err) {
      console.error("Error executing update query:", err);
      console.log('error at query')
      res.status(500).json({ error: "Internal server error." });
    } else {
      res.json(1);
    }
  });
});



app.post('/edit_pet_profile_with_pic/:id', upload.single('petPicture'), (req, res) => {
  const id = req.params.id;
  const {
    gender,
    age,
    breed,
    weight,
    color,
    petname,
    species,
    about
  } = req.body;

  // Assuming petPicture is a file upload and may not be updated in every request
  const petPicture = req.file ? req.file.filename : null;

  const sql = `
    UPDATE pet_profile 
    SET 
      gender = ?,
      age = ?,
      breed = ?,
      weight = ?,
      color = ?,
      petname = ?,
      species = ?,
      petPicture = ?,
      about = ?
    WHERE id = ?
  `;

  const values = [gender, age, breed, weight, color, petname, species, petPicture, about, id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error executing update query:", err);
      res.status(500).json({ error: "Internal server error." });
    } else {
      res.json(1);
    }
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


app.get('/get_records/:petId', (req, res) => {
  const pet_id = req.params.petId;
  const sql = `SELECT * FROM health_records where pet_id = '${pet_id}'`;

  conn.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching pet profiles:', err);
      res.status(500).json({ error: 'An error occurred while fetching pet profiles' });
      return;
    }
    else {
      res.json(result);
    }

  });
});

//adding the api to get the previous record by the user

app.get('/get_records_for_update/:idd', (req, res) => {
  const id = req.params.idd;
  const sql = `SELECT * FROM health_records where id = '${id}'`;

  conn.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching pet profiles:', err);
      res.status(500).json({ error: 'An error occurred while fetching pet profiles' });
      return;
    }
    else {
      res.json(result);
    }

  });
});


app.post('/update_health_record/:idd', (req, res) => {
  const id = req.params.idd;
  const { vaccination, medication, allergies, surgeries } = req.body;

  const updateQuery = `
    UPDATE health_records
    SET vaccination = ?,
        medication = ?,
        allergies = ?,
        surgeries = ?
    WHERE id = ?
  `;

  conn.query(updateQuery, [vaccination, medication, allergies, surgeries, id], (err, result) => {
    if (err) {
      console.error('Error updating health record:', err);
      res.status(500).json({ error: 'An error occurred while updating health record' });
      return;
    }

    res.json({ message: 'Health record updated successfully' });
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

app.get('/view-health-information', (req, res) => {
  res.render('view_health_information');
});

app.get('/update-health-information', (req, res) => {
  res.render('update_health_information');
});

app.get('/pet-memories-timeline', (req, res) => {
  res.render('pet_memories_timeline');
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

app.get('/create-post', (req, res) => {
  res.render('create_post');
});

app.get('/create-pet-profile', (req, res) => {
  res.render('create_pet_profile');
});

app.get('/record-health-information', (req, res) => {
  res.render('record_health_information');
});

app.get('/create-pet-profile-new', (req, res) => {
  res.render('create_pet_profile_new');
});

app.get('/s123-new', (req, res) => {
  res.render('s123_new');
});


app.post("/check_petname", function (req, res) {

  var petname = req.body.petname;
  var sql = `SELECT * FROM pet_profile WHERE petname= '${petname}'`;
  conn.query(sql, function (err2, results) {
    if (err2) {
      console.error(err2);
    }
    else {
      var found = false;
      results.forEach(element => {
        if ((petname == element.petname) && found == false) {
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

// count post api
// Define the /api/pet-memories-count endpoint
app.get('/api/pet-memories-count/:username/:petname', (req, res) => {
  const username = req.params.username;
  const petname = req.params.petname;
  const sql = `SELECT COUNT(*) AS count FROM pet_memories WHERE pet_owner = '${username}' AND petname = '${petname}'`;

  conn.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching post count:', err);
      res.status(500).json({ error: 'An error occurred while fetching post count' });
      return;
    }

    const count = result[0] ? result[0].count : 0;
    res.json({ count });
  });
});

//
//
// Define the /api/pet-profiles endpoint
app.get('/api/pet-profiles/:username/:petname', (req, res) => {
  const username = req.params.username;
  const petname = req.params.petname;
  const sql = `SELECT petPicture,about, date FROM pet_memories WHERE pet_owner = '${username}' AND petname ='${petname}'`;

  conn.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching pet profiles:', err);
      res.status(500).json({ error: 'An error occurred while fetching pet profiles' });
      return;
    }

    const petProfiles = result.map(row => {
      const fileName = row.petPicture;
      if (fileName) {
        const filePath = path.join(__dirname, 'upload', fileName);
        try {
          const content = fs.readFileSync(filePath, { encoding: 'base64' });
          return { petPicture: content, date: row.date, about: row.about, petname: row.petname };
        } catch (err) {
          console.error('Error reading file:', err);
          return null; // Skip this entry if there is an error reading the file
        }
      } else {
        return null; // Skip this entry if petPicture is not defined
      }
    }).filter(profile => profile !== null); // Filter out null entries

    res.json(petProfiles);
  });
});



//record health info
// Sample Health Information Record Route
app.post('/api/record-health-information/:petId', (req, res) => {
  const petId = req.params.petId;
  const { vaccination, medication, allergies, surgeries } = req.body;

  // Insert into MySQL
  const sql = `
    INSERT INTO health_records (pet_id, vaccination, medication, allergies, surgeries)
    VALUES (?, ?, ?, ?, ?)
  `;

  conn.query(sql, [petId, vaccination, medication, allergies, surgeries], (err, result) => {
    if (err) {
      console.error('Error recording health information:', err);
      res.status(500).json({ error: 'An error occurred while recording health information' });
    } else {
      res.json({ success: true, message: 'Health information recorded successfully' });
    }
  });
});

// Sample Health Information Update Route
app.put('/api/update-health-information/:recordId', (req, res) => {
  const recordId = req.params.recordId;
  const { vaccination, medication, allergies, surgeries } = req.body;

  // Update MySQL record
  const sql = `
    UPDATE health_records
    SET vaccination = ?, medication = ?, allergies = ?, surgeries = ?
    WHERE id = ?
  `;

  conn.query(sql, [vaccination, medication, allergies, surgeries, recordId], (err, result) => {
    if (err) {
      console.error('Error updating health information:', err);
      res.status(500).json({ error: 'An error occurred while updating health information' });
    } else {
      res.json({ success: true, message: 'Health information updated successfully' });
    }
  });
});

//end fyp1 pet 


app.listen(3001,(err) =>{
    if(err) throw err;
   
    console.log('Server is running on localhost:3001');
});