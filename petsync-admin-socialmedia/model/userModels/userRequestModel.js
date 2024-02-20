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
// Method to delete a user request by ID
static async deleteRequest(requestId) {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM user_requests WHERE id = ?', [requestId], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results.affectedRows);
        });
    });
}
   
}

module.exports = UserRequest;
