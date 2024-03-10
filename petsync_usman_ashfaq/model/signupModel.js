const connection = require('../config');
const { promisify } = require('util');

class signupModel {
    constructor() {
        this.promiseConnectionQuery = promisify(connection.query).bind(connection);
    }

    async UserInfo(req, res) {
        try {
            const data = {
                "username": req.body.userName,
                "password": req.body.passWord,
                "email": req.body.email,
            };
            console.log(data);

            // Insert user data into the 'users' table
            await this.promiseConnectionQuery('INSERT INTO users SET ?', data);
            // Insert initial follow count data into the 'followcount' table
        // const followCountData = {
        //     "username": data.username,
        //     "followers": 0,
        //     "following": 0
        // };
        // await this.promiseConnectionQuery('INSERT INTO followcount SET ?', followCountData);


            // Retrieve the inserted user's information
            const result = await this.promiseConnectionQuery('SELECT * FROM users WHERE username = ?', data.username);

            
        } catch (error) {
            console.error(error);
            res.status(500).send({
                "code": 500,
                "error": "Internal server error"
            });
        }
    }
}

module.exports = signupModel;