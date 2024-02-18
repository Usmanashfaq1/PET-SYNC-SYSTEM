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

// Route to fetch all users
router.get('/users_media',isUserAuthenticated, async (req, res) => {
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        res.render('media_users', { users: rows });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Route to block a user
router.post('/block/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        await connection.execute('UPDATE users SET is_blocked = 1 WHERE id = ?', [userId]);
        res.redirect('/users_media'); // Redirect to refresh the user list
    } catch (err) {
        console.error('Error blocking user:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Route to unblock a user
router.post('/unblock/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        await connection.execute('UPDATE users SET is_blocked = 0 WHERE id = ?', [userId]);
        res.redirect('/users_media'); // Redirect to refresh the user list
    } catch (err) {
        console.error('Error unblocking user:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Route to delete a user
router.post('/delete/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        await connection.execute('DELETE FROM users WHERE id = ?', [userId]);
        res.redirect('/users_media'); // Redirect to refresh the user list
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
