const { promisify } = require('util');
const connection = require('../config');

class HomeModel {
  constructor() {
    this.promiseConnection = promisify(connection.query).bind(connection);
  }

  async getFeedData(followerUsername) {
    try {
      const feedQuery = `
        SELECT * FROM userfeed
        INNER JOIN followinfo ON userfeed.username = followinfo.following
        WHERE followinfo.follower = '${followerUsername}'
        ORDER BY created_at DESC`;

      const feedData = await this.promiseConnection(feedQuery);
      return feedData;
    } catch (error) {
      throw error;
    }
  }

  
}

module.exports = new HomeModel();
