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
// Route to render the admin panel view and fetch reports
router.get('/admin', isUserAuthenticated, async (req, res) => {
    try {
        let sortBy = req.query.sortBy || 'created_at'; // Default sorting by creation date
        let sortOrder = req.query.sortOrder || 'DESC'; // Default sorting order is descending
        let searchQuery = req.query.searchQuery || ''; // Default search query is empty

        // Validate sortBy parameter to prevent SQL injection
        const allowedSortByFields = ['created_at', 'reported_username', 'reporter_username'];
        if (!allowedSortByFields.includes(sortBy)) {
            sortBy = 'created_at'; // Default to creation date if invalid sortBy value
        }

        // Construct the SQL query with sorting and search options
        const query = `
        SELECT 
            reports.id AS report_id,
            reported_users.id AS reported_user_id,
            reporter_users.id AS reporter_user_id,
            reports.reason,
            reports.created_at,
            reported_users.username AS reported_username,
            reported_users.email AS reported_email,
            reporter_users.username AS reporter_username,
            reporter_users.email AS reporter_email
        FROM 
            reports
        JOIN 
            users AS reported_users ON reports.reported_user_id = reported_users.id
        JOIN 
            users AS reporter_users ON reports.reporter_user_id = reporter_users.id
        WHERE 
            reported_users.username LIKE '%${searchQuery}%' OR
            reported_users.email LIKE '%${searchQuery}%' OR
            reporter_users.username LIKE '%${searchQuery}%' OR
            reporter_users.email LIKE '%${searchQuery}%'
        ORDER BY ${sortBy} ${sortOrder}`;
    

        const [rows, fields] = await connection.execute(query);
        res.render('reports', { reports: rows, sortBy, sortOrder, searchQuery }); // Pass sorting options and search query to the view
    } catch (err) {
        console.error('Error fetching reports:', err);
        res.status(500).send('Internal Server Error');
    }
});






module.exports = router;
