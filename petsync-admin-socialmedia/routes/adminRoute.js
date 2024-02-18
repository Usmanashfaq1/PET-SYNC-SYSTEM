// admin.js

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

// Route to render the admin panel view and fetch reports
router.get('/admin', isUserAuthenticated, async (req, res) => {
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM reports');
        res.render('reports', { reports: rows });
    } catch (err) {
        console.error('Error fetching reports:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
