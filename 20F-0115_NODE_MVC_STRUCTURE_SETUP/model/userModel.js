const { promisify } = require('util');
const connection = require('../config');

class UserModel {
  constructor() {
    this.promiseConnectionQuery = promisify(connection.query).bind(connection);
  }

  async getUsers(currentUser) {
    const query = 'SELECT * FROM users  ORDER BY created_at DESC';
    try {
      const results = await this.promiseConnectionQuery(query, [currentUser]);
      return results;
    } catch (error) {
      throw new Error('Error fetching users from database');
    }
  }
}
  

module.exports = new UserModel();
