
// appointmentController.js

const express = require('express');
const router = express.Router();
const Appointment = require('../../model/appointmentModel');
const { isUserAuthenticated } = require('../../middleware/authMiddleware');
router.get('/appointments',isUserAuthenticated, async (req, res) => {
    try {
        const vetEmail = req.session.email; // Assuming vet's email is stored in session
        const sortBy = req.query.sortBy || 'date'; // Default sorting by date

        
        const appointments = await Appointment.getAppointmentsForVet(vetEmail, sortBy);
        res.render('appointments', { appointments, sortBy });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
