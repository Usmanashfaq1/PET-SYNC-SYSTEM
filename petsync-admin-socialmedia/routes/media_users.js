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

  // Route to search users by name



  router.get('/users_media', isUserAuthenticated, async (req, res) => {
    try {
        let searchQuery = req.query.q || ''; // Get the search query parameter from the URL
        let sortByBlocked = req.query.sortByBlocked || ''; // Get sortByBlocked parameter
        let query = 'SELECT * FROM users';

        if (searchQuery) {
            query += ` WHERE username LIKE '%${searchQuery}%'`; // Add WHERE clause if searchQuery is provided
        }

        if (sortByBlocked) {
            if (searchQuery) {
                query += ' AND';
            } else {
                query += ' WHERE';
            }
            if (sortByBlocked === 'blocked') {
                query += ' is_blocked = 1';
            } else if (sortByBlocked === 'notblocked') {
                query += ' is_blocked = 0';
            }
        }

        const [rows, fields] = await connection.execute(query);
        res.render('media_users', { users: rows, searchQuery, sortByBlocked }); // Pass sortByBlocked to the view
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Internal Server Error');
    }
});



// Route to block a user
router.post('/block1/:userId', async (req, res) => {
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
