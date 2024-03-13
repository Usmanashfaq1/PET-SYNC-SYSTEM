const { promisify } = require('util');
const connection = require('../config');

class loginModel {
  constructor() {
    this.promiseConnectionQuery = promisify(connection.query).bind(connection);
  }

  async checkUser(req, res) {
    try {
        const { userName, passWord } = req.body;
        const query = 'SELECT * FROM users WHERE username = ?';
        const results = await this.promiseConnectionQuery(query, [userName]);

        if (results.length > 0) {
            if (results[0].is_blocked) {
                return { blocked: true, message: "You are blocked. Please contact admin." };
            }

            const comparision = passWord === results[0].password;
            if (comparision) {
                // Successful login
                req.session.num = results[0].id;
                req.session.username = userName;
                return { success: true, redirect: '/main' };
            } else {
                // Incorrect password
                return { success: false, msg: "Username and password do not match" };
            }
        } else {
            // User not found
            return { success: false, msg: "Username does not exist" };
        }
    } catch (error) {
        console.error("Error occurred while logging in:", error);
        return { success: false, msg: "Internal Server Error" };
    }
}


}

module.exports = loginModel;
