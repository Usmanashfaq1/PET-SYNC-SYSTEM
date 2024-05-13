// users.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const { isUserAuthenticated } = require('../middleware/authMiddleware');


const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'petcommunity'
  });

  router.post('/block/:userId', isUserAuthenticated, async (req, res) => {
    const userId = req.params.userId;
    try {
        // Check if the user is already blocked
        const [rows] = await connection.execute('SELECT is_blocked FROM users WHERE id = ?', [userId]);
        if (rows.length === 0) {
            try {
               
                const message = "User not Found";
                res.render('showmessage', { message });
            } catch (error) {
                console.error('Error creating request:', error);
                const errorMessage = 'Something is broken!';
                res.render('showmessage', { message: errorMessage });
            }
        }
        if (rows[0].is_blocked === 1) {
            try {
               
                const message = "User is already blocked!";
                res.render('showmessage', { message });
            } catch (error) {
                console.error('Error creating request:', error);
                const errorMessage = 'Something is broken!';
                res.render('showmessage', { message: errorMessage });
            }
        }
        
        // If the user is not blocked, proceed to block the user
        await connection.execute('UPDATE users SET is_blocked = 1 WHERE id = ?', [userId]);
        try {
               
            const message = "User Blocked Successfully";
            res.render('showmessage', { message });
        } catch (error) {
            console.error('Error creating request:', error);
            const errorMessage = 'Something is broken!';
            res.render('showmessage', { message: errorMessage });
        }
    } catch (err) {
        console.error('Error blocking user:', err);
        res.status(500).send('Internal Server Error');
    }
});


// Route to neglect a user
router.post('/neglect/:userId', isUserAuthenticated, async (req, res) => {
    const userId = req.params.userId;
    try {
        // Delete reports associated with the neglected user
        await connection.execute('DELETE FROM reports WHERE id = ?', [userId]);

        try {
               
            const message = "Report neglected successfully!";
            res.render('showmessage', { message });
        } catch (error) {
            console.error('Error creating request:', error);
            const errorMessage = 'Something is broken!';
            res.render('showmessage', { message: errorMessage });
        }
    } catch (err) {
        console.error('Error neglecting user:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
