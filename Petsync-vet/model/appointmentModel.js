// appointmentModel.js

const db= require('../config');

class Appointment {
    static getAppointmentsForVet(vetEmail, sortBy) {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM appointment WHERE vet_email = ?';
            if (sortBy === 'date') {
                query += ' ORDER BY date DESC';
            } else if (sortBy === 'approved') {
                query += ' ORDER BY status = "approved" DESC';
            }

            db.query(query, [vetEmail], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
}


module.exports = Appointment;
