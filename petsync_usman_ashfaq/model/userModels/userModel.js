const conn = require("../../config");
const { promisify } = require('util');

const queryAsync = promisify(conn.query).bind(conn);

async function getUserByEmail(email) {
    try {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [user] = await queryAsync(sql, [email]);

        if (user) {
            console.log('User found:', user);
            return user;
        } else {
            console.log('User not found for email:', email);
            return null;
        }
    } catch (error) {
        console.error('Error fetching user by email:', error);
        return null;
    }
}

module.exports = {
    getUserByEmail
};
