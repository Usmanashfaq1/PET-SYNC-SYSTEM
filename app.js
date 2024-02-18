const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const ejs = require('ejs');
const path = require('path'); // Import path module

const app = express();
const port = 3000;

// Database connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pet-sync-database1'
});
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
app.get('/', (req, res) => {
    connection.query('SELECT * FROM pet_profile', (error, pets) => {
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
app.get('/view-schedule', (req, res) => {
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
    connection.query('SELECT * FROM pet_schedule WHERE id = ?', scheduleId, (error, scheduleDetail) => {
        if (error) {
            console.error('Error fetching schedule detail:', error);
            res.status(500).send('Error fetching schedule detail.');
            return;
        }
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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
