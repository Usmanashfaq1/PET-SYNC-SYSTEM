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

      if (results.length > 0)
       {
        const comparision = passWord === results[0].password;
        if (comparision)
         {
          // if its Successful login
          req.session.num = results[0].id;
          req.session.username = userName;
          return res.redirect('/'); 
        } else 
        {
          // if its Incorrect password
          req.session.num = null;
          req.session.username = null;
          const msg = "Username and password do not match";
          return res.render('loginView', { msg });
        }
      } else {
        // if User not found
        req.session.num = null;
        req.session.username = null;
        const msg = "Username does not exist";
        return res.render('loginView', { msg });
      }
    } catch (error)
     {
      console.error("Error occurred while logging in:", error);
      return res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = loginModel;
