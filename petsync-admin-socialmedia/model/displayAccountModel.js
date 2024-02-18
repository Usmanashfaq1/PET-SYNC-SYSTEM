const connection = require("../config");
const { promisify } = require("util");

const promise_connection = promisify(connection.query).bind(connection);

class DisplayAccountModel {
  async getUserData(username, sessionUsername) {
    try {
      console.log("Searched for => " + username);
      const userData = {};

      if (username == sessionUsername) {
        return { redirect: '/profile' };
      }

      const searchId = await this.getUserIdByUsername(username);

      if (!searchId) {
        throw new Error("User not found");
      }

      const userInfo = await this.getUserInfoById(searchId.id);

      if (!userInfo) {
        throw new Error("User info not found");
      }

      userData.data = userInfo;
      userData.dpName = userInfo.profilepic || "images.jpg";
      userData.feedResult = await this.getUserFeedById(searchId.id);
     
      

      return userData;
    } catch (error) {
      throw error;
    }
  }

  async getUserIdByUsername(username) {
    const sqlQuery = "SELECT id FROM users WHERE username=?";
    const [searchId] = await promise_connection(sqlQuery, [username]);
    return searchId;
  }

  async getUserInfoById(id) {
    const sqlQuery = "SELECT * FROM userinfo WHERE id=?";
    const [userInfo] = await promise_connection(sqlQuery, [id]);
    return userInfo;
  }

  async getUserFeedById(id) {
    const feedQuery = "SELECT * FROM userfeed WHERE userid=?";
    return await promise_connection(feedQuery, [id]);
  }

  


}

module.exports = new DisplayAccountModel();
