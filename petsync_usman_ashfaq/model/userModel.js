const { promisify } = require('util');
const connection = require('../config');

class UserModel {
  constructor() {
    this.promiseConnectionQuery = promisify(connection.query).bind(connection);
  }

  async getUsers(currentUser) {
    const query = `
      SELECT userinfo.*, 
        (SELECT COUNT(*) FROM followinfo WHERE following = userinfo.username) AS followers,
        (SELECT COUNT(*) FROM followinfo WHERE follower = userinfo.username) AS following
      FROM userinfo
      WHERE userinfo.username != ?
      ORDER BY userinfo.username;
    `;
    try {
      const results = await this.promiseConnectionQuery(query, [currentUser]);
      return results;
    } catch (error) {
      throw new Error('Error fetching users from database');
    }
  }
}

module.exports = new UserModel();
