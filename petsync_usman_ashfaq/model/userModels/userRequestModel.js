const connection = require('../../config');

class UserRequest {
    // Method to fetch all user requests from the database
    static async getAllRequests() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user_requests', (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    // Method to create a new user request
    static async createRequest(userEmail, requestText) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO user_requests (user_email, request_text) VALUES (?, ?)', [userEmail, requestText], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            });
        });
    }
}

module.exports = UserRequest;
