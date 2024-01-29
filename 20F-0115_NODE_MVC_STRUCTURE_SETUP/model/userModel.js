const connection = require("../config/db");
const { promisify } = require("util");



const promise_connection = promisify(connection.query).bind(connection);

// getusers function which returns users //using promisfy so we avoid call backs  using await to wait for query and async
exports.getUsers = async () => {

  let query = "select * from users";
  return await promise_connection(query);
};