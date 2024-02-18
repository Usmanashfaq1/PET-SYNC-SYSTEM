// users.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');


const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'petcommunity'
  });

// Route to block a user
router.post('/block/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        await connection.execute('UPDATE users SET is_blocked = 1 WHERE id = ?', [userId]);
        res.send('User blocked successfully');
    } catch (err) {
        console.error('Error blocking user:', err);
        res.status(500).send('Internal Server Error');
        
    }
});

// Route to neglect a user
router.post('/neglect/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        // Delete reports associated with the neglected user
        await connection.execute('DELETE FROM reports WHERE reported_user_id = ?', [userId]);

        res.send('Reports for the user neglected successfully');
    } catch (err) {
        console.error('Error neglecting user:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
