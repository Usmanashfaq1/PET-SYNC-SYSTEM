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

  router.post('/block/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        // Check if the user is already blocked
        const [rows] = await connection.execute('SELECT is_blocked FROM users WHERE id = ?', [userId]);
        if (rows.length === 0) {
            return res.status(404).send('User not found');
        }
        if (rows[0].is_blocked === 1) {
            return res.send('User is already blocked');
        }
        
        // If the user is not blocked, proceed to block the user
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
